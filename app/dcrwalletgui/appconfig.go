package dcrwalletgui

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/decred/dcrd/dcrutil/v3"
	proto "github.com/golang/protobuf/proto"
)

var (
	appDataDir        = dcrutil.AppDataDir("dcrwalletgui", false)
	defaultConfigFile = filepath.Join(appDataDir, "dcrwalletgui.conf")
	cfg               = &AppConfiguration{}

	defaultConfig = &AppConfiguration{
		DcrdHost: &AppConfiguration_RPCEndpoint{
			Hostname:     "localhost",
			Port:         9109,
			Username:     "gcUGfbMiULCnMm5OkmtDiS845GI=",
			Password:     "azU+CHeww4WgmBTtRrmyoahL81U=",
			Network:      AppConfiguration_SIMNET,
			CertFileName: "../dcrd-simnet.cert",
		},
		DcrwalletHosts: []*AppConfiguration_RPCEndpoint{
			&AppConfiguration_RPCEndpoint{
				Hostname:     "localhost",
				Port:         19558,
				Username:     "rpc",
				Password:     "0264a4798cfc71ad569a23e2f5c949b4e512837d7d3846",
				CertFileName: "../../dcrwallet_alice.cert",
				Network:      AppConfiguration_SIMNET,
			},
		},
	}
)

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
func LoadConfig() error {

	if !fileExists(defaultConfigFile) {
		err := WriteConfig()
		if err != nil {
			log.Printf("Unable to create default configuration %s: %s", defaultConfigFile, err)
			return err
		}
	}

	cfgFile, err := os.Open(defaultConfigFile)
	if err != nil {
		log.Printf("Unable to load config file %s: %s", defaultConfigFile, err)
		return err
	}
	defer cfgFile.Close()

	content, err := ioutil.ReadAll(cfgFile)
	if err != nil {
		return err
	}
	json.Unmarshal(content, cfg)
	return nil
}

// WriteConfig writes out the configuration into the config file
func WriteConfig() error {
	// Create the destination directory if it does not exist
	err := os.MkdirAll(appDataDir, 0700)
	if err != nil {
		return err
	}

	// Create the destination file and write the JSON serialized configuration into it
	dest, err := os.OpenFile(defaultConfigFile,
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

	_, err = dest.Write(out.Bytes())
	if err != nil {
		return err
	}
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
