'use strict';

/* Tracking Version */
const dimensions = {
	TRACKING_VERSION: 'dimension1',
	CLIENT_ID: 'dimension2',
	WINDOW_ID: 'dimension3',
	HIT_ID: 'dimension4',
	HIT_TIME: 'dimension5',
	HIT_TYPE: 'dimension6'
};
const TRACKING_VERSION = '2';

/* Create random Window ID */
const uuid = function b(a) {
	return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) :
		([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

/* Anonymized user JS error tracking */
function trackError(error, fieldsObj) {
	fieldsObj = {
		eventCategory: 'Script',
		eventAction: 'error',
		eventLabel: (error && error.stack) || '(not set)',
		nonInteraction: true
	}
	ga('send', 'event', fieldsObj);
}
function trackErrors() {
	const loadErrorEvents = window.__e && window.__e.q || [];
	const fieldsObj = {eventAction: 'uncaught error'};

	// Replay any stored load error events.
	/*for (let event of loadErrorEvents) {
		trackError(event.error, fieldsObj);
	}*/
	for (var i = 0, len = loadErrorEvents.length; i < len; i++) {
		trackError(loadErrorEvents[i].error, fieldsObj);
	}

	// Add a new listener to track event immediately.
	window.addEventListener('error', function(event) {
		trackError(event.error, fieldsObj);
	});
}

/* Performance tracking */
const metrics = {
	RESPONSE_END_TIME: 'metric4',
	DOM_LOAD_TIME: 'metric5',
	WINDOW_LOAD_TIME: 'metric6'
};
function sendNavigationTimingMetrics() {
	// Only track performance in supporting browsers.
	if (!(window.performance && window.performance.timing)) return;

	// If the window hasn't loaded, run this function after the `load` event.
	if (document.readyState != 'complete') {
		window.addEventListener('load', sendNavigationTimingMetrics);
		return;
	}

	const nt = performance.timing;
	const navStart = nt.navigationStart;

	const responseEnd = Math.round(nt.responseEnd - navStart);
	const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
	const windowLoaded = Math.round(nt.loadEventStart - navStart);

	// In some edge cases browsers return very obviously incorrect NT values,
	// e.g. 0, negative, or future times. This validates values before sending.
	const allValuesAreValid = function(values) {
		return values.every(function(value) {value > 0 && value < 1e6});
	};

	if (allValuesAreValid([responseEnd, domLoaded, windowLoaded])) {
		var RESPONSE_END_TIME = metrics.RESPONSE_END_TIME;
		var DOM_LOAD_TIME = metrics.DOM_LOAD_TIME;
		var WINDOW_LOAD_TIME = metrics.WINDOW_LOAD_TIME;
		ga('send', 'event', {
			eventCategory: 'Navigation Timing',
			eventAction: 'track',
			nonInteraction: true,
			RESPONSE_END_TIME: responseEnd,
			DOM_LOAD_TIME: domLoaded,
			WINDOW_LOAD_TIME: windowLoaded,
		});
	}
};

/* Init code */
function init() {
	window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
	ga('create', 'UA-65972933-1', 'auto');
	/*ga('require', 'GTM-T54FLJB');*/
	ga('set', 'transport', 'beacon');
	ga('set', dimensions.TRACKING_VERSION, TRACKING_VERSION);
	ga('set', dimensions.WINDOW_ID, uuid());
	ga('require', 'linkid', 'linkid.js');

	/* Client ID */
	ga(function(tracker) {
		var clientId = tracker.get('clientId');
		tracker.set(dimensions.CLIENT_ID, clientId);
	});

	/* Hit Detection */
	ga(function(tracker) {
		const originalBuildHitTask = tracker.get('buildHitTask');
		tracker.set('buildHitTask', function(model) {
			model.set(dimensions.HIT_ID, uuid(), true);
			model.set(dimensions.HIT_TIME, String(+new Date), true);
			model.set(dimensions.HIT_TYPE, model.get('hitType'), true);

			originalBuildHitTask(model);
		});
	});
	ga('require', 'eventTracker');
	ga('require', 'outboundLinkTracker', {
		events: ['click', 'auxclick', 'contextmenu']
	});
	ga('require', 'maxScrollTracker', {
		maxScrollMetricIndex: 1,
		hitFilter: function(model) {
			var scrollPercentage = model.get('eventLabel');
			if (scrollPercentage > 25) {
				// Sets the nonInteractive field to `false` for the current hit.
				model.set('nonInteraction', false, true);
			}
		},
	});
	ga('require', 'cleanUrlTracker', {
		stripQuery: true,
		queryParamsWhitelist: ['q'],
		queryDimensionIndex: 7,
		indexFilename: 'index.html',
		trailingSlash: 'remove'
	});
	ga('require', 'pageVisibilityTracker', {
		sendInitialPageview: true,
		pageLoadsMetricIndex: 2,
		visibleMetricIndex: 3,
		timeZone: 'America/Chicago',
	});
	// ga('send', 'pageview');

	trackErrors();
	sendNavigationTimingMetrics();
}

init();

/**
* Function that tracks a click on an outbound link in Analytics.
* This function takes a valid URL string as an argument, and uses that URL string
* as the event label. Setting the transport method to 'beacon' lets the hit be sent
* using 'navigator.sendBeacon' in browser that support it.
*/
var trackOutboundLink = function(url) {
	ga('send', 'event', 'outbound', 'click', url, {
		'transport': 'beacon',
		'hitCallback': function(){document.location = url;}
	});
}
