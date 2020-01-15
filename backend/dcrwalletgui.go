// Copyright (c) 2013-2015 The btcsuite developers
// Copyright (c) 2015-2019 The Decred developers
// Use of this source code is governed by an ISC
// license that can be found in the LICENSE file.

package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/decred/dcrd/dcrjson/v3"
	dcrdtypes "github.com/decred/dcrd/rpc/jsonrpc/types/v2"
	wallettypes "github.com/decred/dcrwallet/rpc/jsonrpc/types"
)

// commandUsage display the usage for a specific command.
func commandUsage(method interface{}) {
	usage, err := dcrjson.MethodUsageText(method)
	if err != nil {
		// This should never happen since the method was already checked
		// before calling this function, but be safe.
		fmt.Fprintln(os.Stderr, "Failed to obtain command usage:", err)
		return
	}

	fmt.Fprintln(os.Stderr, "Usage:")
	fmt.Fprintf(os.Stderr, "  %s\n", usage)
}

// usage displays the general usage when the help flag is not displayed and
// and an invalid command was specified.  The commandUsage function is used
// instead when a valid command was specified.
func usage(errorMessage string) {
	appName := filepath.Base(os.Args[0])
	appName = strings.TrimSuffix(appName, filepath.Ext(appName))
	fmt.Fprintln(os.Stderr, errorMessage)
	fmt.Fprintln(os.Stderr, "Usage:")
	fmt.Fprintf(os.Stderr, "  %s [OPTIONS] <command> <args...>\n\n",
		appName)
}

var cfg *config

func main() {

	var err error

	cfg, _, err = loadConfig()
	// cfg, args, err := loadConfig()
	if err != nil {
		log.Println("Load config error", err)
		os.Exit(1)
	}

	// paramsList := make([]string, 0)
	// runCmd("getbalance", paramsList)

	// create router instance
	router := NewRouter()

	// handle events with messages named `wsPing` with handler
	// wsPing (from above).
	router.Handle("wsPing", wsPing)
	router.Handle("getbalance", getBalance)

	http.Handle("/", http.FileServer(http.Dir("../frontend/dist")))

	// handle all requests to /, upgrade to WebSocket via our router handler.
	http.Handle("/ws", router)

	// start server.
	http.ListenAndServe(":8080", nil)
}


func runCmd(methodStr string, paramsList []string) (string, error) {

	// Ensure the specified method identifies a valid registered command and
	// is one of the usable types.
	// methodStr := args[0]
	var method interface{} = dcrdtypes.Method(methodStr)
	usageFlags, err := dcrjson.MethodUsageFlags(method)
	if err != nil {
		method = wallettypes.Method(methodStr)
		usageFlags, err = dcrjson.MethodUsageFlags(method)
	}
	if err != nil {
		log.Printf("Unrecognized command %q\n", methodStr)
		return "", err
	}
	if usageFlags&unusableFlags != 0 {
		log.Printf("The '%s' command can only be used via websockets\n", method)
		return "", err
	}

	// Convert remaining command line args to a slice of interface values
	// to be passed along as parameters to new command creation function.
	//
	// Since some commands, such as submitblock, can involve data which is
	// too large for the Operating System to allow as a normal command line
	// parameter, support using '-' as an argument to allow the argument
	// to be read from a stdin pipe.
	bio := bufio.NewReader(os.Stdin)
	params := make([]interface{}, 0, len(paramsList))
	for _, arg := range paramsList {
		if arg == "-" {
			param, err := bio.ReadString('\n')
			if err != nil && err != io.EOF {
				log.Printf("Failed to read data from stdin: %v\n", err)
				return "", err
			}
			if err == io.EOF && len(param) == 0 {
				log.Printf("Not enough lines provided on stdin")
				return "", err
			}
			param = strings.TrimRight(param, "\r\n")
			params = append(params, param)
			continue
		}

		params = append(params, arg)
	}

	// Attempt to create the appropriate command using the arguments
	// provided by the user.
	cmd, err := dcrjson.NewCmd(method, params...)
	if err != nil {
		// Show the error along with its error code when it's a
		// dcrjson.Error as it realistically will always be since the
		// NewCmd function is only supposed to return errors of that
		// type.
		if jerr, ok := err.(dcrjson.Error); ok {
			log.Printf("%s command: %v (code: %s)\n", method, err, jerr.Code)
			commandUsage(method)
			return "", err
		}

		// The error is not a dcrjson.Error and this really should not
		// happen.  Nevertheless, fallback to just showing the error
		// if it should happen due to a bug in the package.
		log.Printf("%s command: %v\n", method, err)
		commandUsage(method)
		return "", err
	}

	// Marshal the command into a JSON-RPC byte slice in preparation for
	// sending it to the RPC server.
	marshalledJSON, err := dcrjson.MarshalCmd("1.0", 1, cmd)
	if err != nil {
		log.Println(err)
		return "", err
	}

	// Send the JSON-RPC request to the server using the user-specified
	// connection configuration.
	result, err := sendPostRequest(marshalledJSON, cfg)
	if err != nil {
		log.Println(err)
		return "", err
	}

	// Choose how to display the result based on its type.
	strResult := string(result)
	if strings.HasPrefix(strResult, "{") || strings.HasPrefix(strResult, "[") {
		var dst bytes.Buffer
		if err := json.Indent(&dst, result, "", "  "); err != nil {
			log.Printf("Failed to format result: %v",
				err)
			return "", err
		}
		jsonResult :=dst.String()
		fmt.Println(jsonResult)
		return jsonResult, nil
	} else if strings.HasPrefix(strResult, `"`) {
		var str string
		if err := json.Unmarshal(result, &str); err != nil {
			log.Printf("Failed to unmarshal result: %v", err)
			return "", err
		}
		fmt.Println(str)
		return str, nil
	} else if strResult != "null" {
		fmt.Println(strResult)
		return strResult, nil
	}

	return "", nil
}
