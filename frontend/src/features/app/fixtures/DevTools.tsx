import React from "react"

import LogMonitor from "redux-devtools-log-monitor"
import DockMonitor from "redux-devtools-dock-monitor"
// @ts-ignore
import SliderMonitor from "redux-slider-monitor"
import { createDevTools } from "redux-devtools"

const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        changeMonitorKey="ctrl-m"
        defaultPosition="right"
        defaultIsVisible={true}
    >
        <SliderMonitor keyboardEnabled />
        <LogMonitor theme="tomorrow" />
    </DockMonitor>
)

export default DevTools
