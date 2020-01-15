package main

import "log"

// wsPing is a method that handles messages from the app client.
func wsPing(c *Client, data interface{}) {
	log.Printf("hello from client! message: %v\n", data)

	// set and write response message
	c.send = Message{Name: "wsPong", Data: "hello client!"}
	c.Write()
}

func getBalance(c *Client, data interface{}) {

	log.Printf("received from client: %v\n", data)

	paramsList := make([]string, 0)
	result, err := runCmd("getbalance", paramsList)

	if err != nil {
		log.Println("error", err)
	}

	// set and write response message
	c.send = Message{Name: "getbalanceResult", Data: result}
	c.Write()
}
