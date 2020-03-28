package walletgui

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"crypto/rand"
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
	proto "github.com/golang/protobuf/proto"
	"github.com/zserge/lorca"
)

var (
	appDataDir        = dcrutil.AppDataDir("dcrwalletgui", false)
	defaultConfigFile = filepath.Join("./", "dcrwalletgui.json")
	configFilePath    = filepath.Join(appDataDir, defaultConfigFile)
	cfg               = newConfig()
	savedPassphrase   = ""

	defaultConfig = &AppConfiguration{
		DcrdEndpoint: &RPCEndpoint{
			Hostname:     "localhost",
			Port:         9109,
			Username:     "gcUGfbMiULCnMm5OkmtDiS845GI=",
			Password:     "azU+CHeww4WgmBTtRrmyoahL81U=",
			Network:      Network_SIMNET,
			CertFileName: "../dcrd-simnet.cert",
			Label:        "localhost:9109 (SIMNET)",
		},
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
			return err
		}
		var decryptedContent, err = decrypt(content, passphrase)
		if err != nil {
			return err
		}
		if err = json.Unmarshal(decryptedContent, cfg); err != nil {
			return err
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
		if _, err = dest.Write(encrypt(out.Bytes(), passphrase)); err != nil {
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

func encrypt(data []byte, passphrase string) []byte {
	block, _ := aes.NewCipher([]byte(createHash(passphrase)))
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		panic(err.Error())
	}
	ciphertext := gcm.Seal(nonce, nonce, data, nil)
	return ciphertext
}

func decrypt(data []byte, passphrase string) ([]byte, error) {
	key := []byte(createHash(passphrase))
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}
	nonceSize := gcm.NonceSize()
	nonce, ciphertext := data[:nonceSize], data[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return nil, err
	}
	return plaintext, nil
}

// ExportConfigAPI exports functions to the UI
func ExportConfigAPI(ui lorca.UI) {
	ui.Bind("walletgui__GetConfig", func(decryptionKey string) (r LorcaMessage) {
		// signal the UI that the configuration is empty, needs initial setup
		err := LoadConfig(decryptionKey)
		if err != nil {
			fmt.Println("Could not read the config")
			r.Payload = nil
			r.Err = nil
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

	ui.Bind("walletgui__SetConfig", func(requestAsHex string) (r LorcaMessage) {
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
				// attempting to reload config file using the given passphrase
				err := LoadConfig(passphrase)
				if err != nil {
					r.Err = errors.New("invalid passphrase")
					return r
				}
				fmt.Println("Turning off encryption")
				SetConfig(request.AppConfig)
				err = WriteConfig("")
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
}
