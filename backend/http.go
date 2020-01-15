package main

import (
	"bytes"
	"html/template"
	"net/http"
	"path"
	"time"
)

type indexHandler struct {
	ServerName      string
	OnionServerName string
	Address         string
	OnionAddress    string
	Epoch           time.Duration
	SelfSigned      []byte
}

func ServeIndex(w http.ResponseWriter, r *http.Request) {

	data := indexHandler{
		ServerName: "blah",
	}
	indexTmpl.Execute(w, data)

}

func (h *indexHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if len(h.SelfSigned) != 0 && r.URL.Path == "/"+h.ServerName+".pem" {
		w.Header().Add("Expires", time.Now().Add(365*24*time.Hour).Format(time.RFC1123))
		http.ServeContent(w, r, path.Base(r.URL.Path), time.Time{}, bytes.NewReader(h.SelfSigned))
		return
	}
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	indexTmpl.Execute(w, h)
}

var indexTmpl = template.Must(template.New("index").Parse(`<!DOCTYPE html>
<html lang="en">
<head>
<title>dcrwalletgui</title>
<meta name="viewport" content="width=device-width">
<link rel=icon href=data:,>
<style>
main {
        max-width: 80ch;
        padding: 2ch;
        line-height: 1.4;
        margin: auto;
        font-family: sans-serif;
}
</style>
</head>

<body>
<main>
<h2>dcrwalletgui</h2>

{{.ServerName}}
</main>
</body>
</html>`))
