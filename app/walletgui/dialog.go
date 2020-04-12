package walletgui

import (
	"fmt"

	"github.com/sqweek/dialog"
)

func showDialog() {
	// dialog.Message("%s", "Please select a file").Title("Hello world!").Info()
	file, err := dialog.File().Title("Save As").Filter("All Files", "*").Save()
	fmt.Println(file)
	fmt.Println("Error:", err)
	dialog.Message("You chose file: %s", file).Title("Goodbye world!").Error()
	dialog.Directory().Title("Now find a dir").Browse()
}

// FileOpenDialog opens an OS native file browser dialog and returns the file
// chosen by the user as a string.
func FileOpenDialog() string {
	file, _ := dialog.File().Title("Open").Filter("All Files", "*").Filter("Certs", "cert").Load()
	return file
}
