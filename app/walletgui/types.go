package walletgui

// LorcaMessage represents a message exchanged with the JS frontend
type LorcaMessage struct {
	Payload  []byte   `json:"payload,omitempty"`
	APayload [][]byte `json:"apayload,omitempty"`
	SPayload string   `json:"spayload,omitempty"`
	Err      error    `json:"error,omitempty"`
}
