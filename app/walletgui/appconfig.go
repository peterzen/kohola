package walletgui

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/decred/dcrd/dcrutil/v3"
	"github.com/gen2brain/dlgs"
	"github.com/golang/protobuf/proto"
	"github.com/peterzen/kohola/webview"
)

var (
	appDataDir        = dcrutil.AppDataDir("kohola", false)
	defaultConfigFile = filepath.Join("./", "kohola.json")
	configFilePath    = filepath.Join(appDataDir, defaultConfigFile)
	cfg               = newConfig()
	savedPassphrase   = ""

	defaultConfig = &AppConfiguration{
		WalletEndpoints: []*GRPCEndpoint{
			&GRPCEndpoint{
				Hostname:     "localhost",
				Port:         19558,
				CertFileName: "../../dcrwallet_alice.cert",
				Network:      Network_SIMNET,
				Label:        "localhost:19558 (SIMNET)",
			},
		},
	}
)

func newConfig() *AppConfiguration {
	return &AppConfiguration{
		// DcrdHost:          &RPCEndpoint{},
		// WalletEndpoints:   []*WalletEndpoint{},
		// WalletPreferences: []*WalletPreferences{},
	}
}

// HaveConfig checks whether there is at least one dcrwallet configuration
func HaveConfig() bool {
	return len(cfg.WalletEndpoints) > 0
}

// GetConfig returns a copy of the active configuration
func GetConfig() *AppConfiguration {
	return cfg
}

// SetConfig changes the active configuration
func SetConfig(c *AppConfiguration) {
	cfg = c
}

// GetConfigMarshaled return a marshaled copy of the configuration
func GetConfigMarshaled() ([]byte, error) {
	b, err := proto.Marshal(cfg)
	return b, err
}

// ErrConfigDecrypt describes an error returned by LoadConfig when the config decryption failed.
type ErrConfigDecrypt struct {
	message string
}

// NewErrConfigDecrypt returns a new ErrConfigDecrypt typed error object
func NewErrConfigDecrypt(message string) *ErrConfigDecrypt {
	return &ErrConfigDecrypt{
		message: message,
	}
}

func (e *ErrConfigDecrypt) Error() string {
	return e.message
}

// LoadConfig reads the config file into AppConfiguration struct
func LoadConfig(passphrase string) error {
	if !fileExists(configFilePath) {
		err := WriteConfig("")
		if err != nil {
			log.Printf("Unable to create default configuration %s: %s", configFilePath, err)
			return err
		}
	}

	cfgFile, err := os.Open(configFilePath)
	if err != nil {
		log.Printf("Unable to load config file %s: %s", configFilePath, err)
		return err
	}
	defer cfgFile.Close()

	content, err := ioutil.ReadAll(cfgFile)
	if err != nil {
		return err
	}
	if err = json.Unmarshal(content, cfg); err != nil {
		if passphrase == "" {
			return NewErrConfigDecrypt("DECRYPT_ERROR")
		}
		var decryptedContent, err = decrypt(passphrase, string(content))
		if err != nil {
			return err
		}
		if err = json.Unmarshal(decryptedContent, cfg); err != nil {
			return NewErrConfigDecrypt("DECRYPT_ERROR")
		}
	}
	savedPassphrase = passphrase
	return nil
}

// WriteConfig writes out the configuration into the config file
func WriteConfig(passphrase string) error {
	// Create the destination directory if it does not exist
	err := os.MkdirAll(appDataDir, 0700)
	if err != nil {
		return err
	}

	// Create the destination file and write the JSON serialized configuration into it
	dest, err := os.OpenFile(configFilePath,
		os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		return err
	}
	defer dest.Close()

	content, err := json.Marshal(cfg)
	if err != nil {
		return err
	}
	var out bytes.Buffer
	json.Indent(&out, content, "", "  ")

	if passphrase == "" {
		if _, err = dest.Write(out.Bytes()); err != nil {
			return err
		}
	} else {
		encmess, err := encrypt(passphrase, string(out.Bytes()))
		if err != nil {
			return err
		}
		if _, err = dest.Write([]byte(encmess)); err != nil {
			return err
		}
	}
	savedPassphrase = passphrase
	return nil
}

// fileExists reports whether the named file or directory exists.
func fileExists(name string) bool {
	if _, err := os.Stat(name); err != nil {
		if os.IsNotExist(err) {
			return false
		}
	}
	return true
}

func createHash(key string) string {
	hasher := md5.New()
	hasher.Write([]byte(key))
	return hex.EncodeToString(hasher.Sum(nil))
}

func encrypt(passphrase string, message string) (encmess string, err error) {
	key, _ := hex.DecodeString(createHash(passphrase))
	plaintext := []byte(message)

	block, err := aes.NewCipher(key)
	if err != nil {
		return
	}

	// The IV needs to be unique, but not secure. Therefore it's common to
	// include it at the beginning of the ciphertext.
	ciphertext := make([]byte, aes.BlockSize+len(plaintext))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		panic(err)
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], plaintext)

	encmess = base64.URLEncoding.EncodeToString(ciphertext)
	return
}

func decrypt(passphrase string, data string) (decodedmess []byte, err error) {
	key, _ := hex.DecodeString(createHash(passphrase))
	cipherText, err := base64.URLEncoding.DecodeString(data)
	if err != nil {
		return
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return
	}

	if len(cipherText) < aes.BlockSize {
		err = errors.New("ciphertext block size is too short")
		return
	}

	//IV needs to be unique, but doesn't have to be secure.
	//It's common to put it at the beginning of the ciphertext.
	iv := cipherText[:aes.BlockSize]
	cipherText = cipherText[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)
	// XORKeyStream can work in-place if the two arguments are the same.
	stream.XORKeyStream(cipherText, cipherText)

	decodedmess = cipherText
	return
}

// InitConfig try to initialize application config.
// If it is protected, the user will be asked for decryption passphrase using native password dialog.
func InitConfig(passphrase string) {
	err := LoadConfig(passphrase)
	if err != nil {
		switch err.(type) {
		case *ErrConfigDecrypt:
			fmt.Println("ErrConfigDecrypt", err)
			var message = "Enter your passphrase to continue:"
			if passphrase != "" {
				message = "Error: invalid passphrase. Please enter your passphrase again:"
			}
			passphraseEntered, b, err := dlgs.Password("Kohala is locked.", message)
			// user pressed Cancel button
			if !b {
				os.Exit(3)
			}
			if err != nil {
				panic(err)
			}

			InitConfig(passphraseEntered)
		default:
			fmt.Println("Could not read the config", err)
		}
	}
}

// ExportConfigAPI exports functions to the UI
func ExportConfigAPI(w webview.Interface) {
	w.Bind("walletgui__GetConfig", func(decryptionKey string) (r LorcaMessage) {
		if HaveConfig() {
			r.Payload, r.Err = GetConfigMarshaled()
			return r
		}

		// signal the UI that the configuration is empty, needs initial setup
		err := LoadConfig(decryptionKey)
		if err != nil {
			fmt.Println("Could not read the config", err)
			r.Payload = nil
			r.Err = err
			return r
		}

		if !HaveConfig() {
			r.Payload = nil
			r.Err = nil
			return r
		}
		r.Payload, r.Err = GetConfigMarshaled()
		return r
	})

	w.Bind("walletgui__SetConfig", func(requestAsHex string) (r LorcaMessage) {
		request := &SetConfigRequest{}
		bytes, err := hex.DecodeString(requestAsHex)
		err = proto.Unmarshal(bytes, request)
		requestedIsConfigEncrypted := request.AppConfig.GetUiPreferences().GetIsConfigEncrypted()

		// if attempting to change IsConfigEncrypted flag
		if GetConfig().GetUiPreferences().GetIsConfigEncrypted() != requestedIsConfigEncrypted {
			passphrase := request.GetPassphrase()
			if passphrase == "" {
				r.Err = errors.New("missing passphrase parameter")
				return r
			}
			if requestedIsConfigEncrypted {
				fmt.Println("Turning on encryption using passphrase parameter")
				SetConfig(request.AppConfig)
				err = WriteConfig(passphrase)
			} else {
				r.Err = errors.New("Turning off encryption is not allowed")
				return r
			}
		} else {
			SetConfig(request.AppConfig)
			err = WriteConfig(savedPassphrase)
		}

		if err != nil {
			fmt.Println("ERROR: ", err)
			r.Err = err
			return r
		}

		return r
	})

	w.Bind("walletgui__FetchCertBlob", func(certFileName string) (r LorcaMessage) {
		b, err := ioutil.ReadFile(certFileName)
		if err != nil {
			r.Err = err
		} else {
			r.SPayload = string(b)
		}
		return r
	})
}
