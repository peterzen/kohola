package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

// configure upgrader
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// accept all?
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Handler is a type representing functions which resolve requests.
type Handler func(*Client, interface{})

// Event is a type representing request names.
type Event string

// Router is a message routing object mapping events to function handlers.
type Router struct {
	rules map[Event]Handler // rules maps events to functions.
}

// NewRouter returns an initialized Router.
func NewRouter() *Router {
	return &Router{
		rules: make(map[Event]Handler),
	}
}

// ServeHTTP creates the socket connection and begins the read routine.
func (rt *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// upgrade connection to socket
	socket, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("socket server configuration error: %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	client := NewClient(socket, rt.FindHandler)

	// running method for reading from sockets, in main routine
	client.Read()
}

// FindHandler implements a handler finding function for router.
func (rt *Router) FindHandler(event Event) (Handler, bool) {
	handler, found := rt.rules["helloFromClient"]
	return handler, found
}

// Handle is a function to add handlers to the router.
func (rt *Router) Handle(event Event, handler Handler) {
	// store in to router rules
	rt.rules[event] = handler

}

type indexHandler struct {
	ServerName string
}

// ServeIndex serves the index page
// func ServeIndex(w http.ResponseWriter, r *http.Request) {

// 	data := indexHandler{
// 		ServerName: "blah",
// 	}
// 	indexTmpl.Execute(w, data)

// }

// func (server *Server) ServeStatic(w http.ResponseWriter, r *http.Request) {
// 	err := server.renderFile(w, r.URL.Path)
// 	if err != nil {
// 		w.Header().Set("Content-Type", "text/html; charset=utf-8")
// 		w.WriteHeader(http.StatusNotFound)
// 		server.fn404(w, r)
// 	}
// }

// var indexTmpl = template.Must(template.New("index").Parse(`<!DOCTYPE html>
// <html lang="en">
// <head>
// <title>dcrwalletgui</title>
// <meta name="viewport" content="width=device-width">
// <link rel=icon href=data:,>
// <style>
// main {
//         max-width: 80ch;
//         padding: 2ch;
//         line-height: 1.4;
//         margin: auto;
//         font-family: sans-serif;
// }
// </style>
// </head>

// <body>
// <main>
// {{.ServerName}}

// <div id="app"></div>

// <h2>dcrwalletgui</h2>

// <script src="dist/bundle.js"></script>

// </main>
// </body>
// </html>`))
