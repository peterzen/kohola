import React from 'react';

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// import SliderMonitor from 'redux-devtools-slider-monitor';
import SliderMonitor from 'redux-slider-monitor';

const DevTools = createDevTools(
	<DockMonitor
		toggleVisibilityKey="ctrl-h"
		changePositionKey="ctrl-q"
		changeMonitorKey='ctrl-m'
		defaultPosition="right"
		defaultIsVisible={true}
	>
		<SliderMonitor keyboardEnabled/>
		<LogMonitor theme="tomorrow" />
	</DockMonitor>
);

export default DevTools;



