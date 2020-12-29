#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
#include "webview.h"

void showAppWindow(void* window) {
  dispatch_async(dispatch_get_main_queue(), ^{
    id windowObj = (__bridge id) window;
    NSWindow *nsWindow = (NSWindow *) windowObj;
    if(nsWindow != nil) {
      [[nsWindow windowController] showWindow:nsWindow];
    }
  });
}