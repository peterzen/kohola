#include <stdlib.h>
#include <gtk/gtk.h>
#include <webkit2/webkit2.h>
#include "webview.h"

void showAppWindow(void *window)
{
    gtk_widget_show_all(GTK_WIDGET(window));
    gtk_window_present(window);
}