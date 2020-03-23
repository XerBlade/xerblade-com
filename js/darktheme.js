'use strict';

// Replace meta tags for dark mode
function changeWebsiteTheme(scheme) {
	var metatags = document.getElementsByTagName("meta");

	if (metatags.length == 0) return;  // skip if not found

	for (var i = metatags.length-1; i >= 0; i--) {
		if (metatags[i].getAttribute('name') && metatags[i].getAttribute('name') == 'theme-color') {
			metatags[i].parentNode.removeChild(metatags[i]);
		}
		if (metatags[i].getAttribute('name') && metatags[i].getAttribute('name') == 'msapplication-navbutton-color') {
			metatags[i].parentNode.removeChild(metatags[i]);
		}
		if (metatags[i].getAttribute('name') && metatags[i].getAttribute('name') == 'apple-mobile-web-app-status-bar-style') {
			metatags[i].parentNode.removeChild(metatags[i]);
		}
	}
	
	if (scheme === 'dark') {
		var link = document.createElement('meta');
		link.setAttribute('name', 'theme-color');
		link.content = "#2E2E2E";
		document.getElementsByTagName('head')[0].appendChild(link);
		var link2 = document.createElement('meta');
		link2.setAttribute('name', 'msapplication-navbutton-color');
		link2.content = "#2E2E2E";
		document.getElementsByTagName('head')[0].appendChild(link2);
		var link3 = document.createElement('meta');
		link3.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
		link3.content = "#2E2E2E";
		document.getElementsByTagName('head')[0].appendChild(link3);
	}
	if (scheme === 'light') {
		var link = document.createElement('meta');
		link.setAttribute('name', 'theme-color');
		link.content = "#f44336";
		document.getElementsByTagName('head')[0].appendChild(link);
		var link2 = document.createElement('meta');
		link2.setAttribute('name', 'msapplication-navbutton-color');
		link2.content = "#f44336";
		document.getElementsByTagName('head')[0].appendChild(link2);
		var link3 = document.createElement('meta');
		link3.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
		link3.content = "#f44336";
		document.getElementsByTagName('head')[0].appendChild(link3);
	}
}

function changeDisqusTheme(scheme) {
	if (scheme === 'dark') {
		var comments = document.getElementById("comments");
		if (!!comments) {
			comments.style.backgroundColor = "rgba(30,30,30,1)";
			comments.style.color = "rgba(255,255,255,0.87)";
			// console.log('disqus dark theme applied');
		}
	}
	if (scheme === 'light') {
		var comments = document.getElementById("comments");
		if (!!comments) {
			comments.style.backgroundColor = "rgb(255,255,255)";
			comments.style.color = "rgba(0, 0, 0, 0.87);";
			// console.log('disqus light theme applied');
		}
	}
}

function refreshDisqusPanel() {
	if (typeof DISQUS !== 'undefined' && DISQUS !== null) {
		DISQUS.reset({
		  reload: true,
		  config: function () {  
			/*console.log('page identifier: ' + this.page.identifier);*/
			this.page.identifier = this.page.identifier;  
			/*console.log('canonical: ' + document.canonicalPageURL);*/
			this.page.url = document.canonicalPageURL;
		  }
		});
		// console.log('reloading disqus');
	}
}
var mqDark = {};
var mqLight = {};
if (window.matchMedia) {
	mqDark = window.matchMedia('(prefers-color-scheme: dark)');
	mqLight = window.matchMedia('(prefers-color-scheme: light)');
}
function themeColorListener(matchesMedia) {
	var matches = matchesMedia.matches;
	var media = matchesMedia.media;
	if(!matches) { // Not matching anymore = not interesting
		return
	}
	if(media === '(prefers-color-scheme: dark)') {
		changeWebsiteTheme('dark');
		if (document.readyState == 'loading') {
			window.addEventListener('DOMContentLoaded', function(event) {
				changeDisqusTheme('dark');
			});
		} else {
			changeDisqusTheme('dark');
			refreshDisqusPanel();
		}
		// console.log('dark theme applied');
	} else if (media === '(prefers-color-scheme: light)') {
		changeWebsiteTheme('light');
		if (document.readyState == 'loading') {
			window.addEventListener('DOMContentLoaded', function(event) {
				changeDisqusTheme('light');
			});
		} else {
			changeDisqusTheme('light');
			refreshDisqusPanel();
		}
		// console.log('light theme applied');
	}
}
function autoToggleColorThemeBySystem() {
	if(window.matchMedia) {
		mqDark.addListener(themeColorListener);
		mqLight.addListener(themeColorListener);
	}
}

// autoToggleColorThemeBySystem();

function removeColorThemeBySystem() {
	if(window.matchMedia) {
		mqDark.removeListener(themeColorListener);
		mqLight.removeListener(themeColorListener);
	}
}

function setInitialColorTheme() {
	const value = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue('content')
		.replace(/"/g, '');
		
	if (value == 'dark') {
		changeWebsiteTheme('dark');
		if (document.readyState == 'loading') {
			window.addEventListener('DOMContentLoaded', function(event) {
				changeDisqusTheme('dark');
			});
		} else {
			changeDisqusTheme('dark');
			refreshDisqusPanel();
		}
	} else {
		changeWebsiteTheme('light');
		if (document.readyState == 'loading') {
			window.addEventListener('DOMContentLoaded', function(event) {
				changeDisqusTheme('light');
			});
		} else {
			changeDisqusTheme('light');
			refreshDisqusPanel();
		}
	}
}

// setInitialColorTheme();

function setDarkMode() {
	var darkthemestylesheet = document.getElementById('darkthemestylesheet');
	darkthemestylesheet.setAttribute('media', 'screen,projection');
	changeWebsiteTheme('dark');
	if (document.readyState == 'loading') {
		window.addEventListener('DOMContentLoaded', function(event) {
			changeDisqusTheme('dark');
			refreshDisqusPanel();
		});
	} else {
		changeDisqusTheme('dark');
		refreshDisqusPanel();
	}
	removeColorThemeBySystem();
	localStorage.setItem('themeSwitch', 'dark');
	// console.log('dark theme applied');
}


function setLightMode() {
	var darkthemestylesheet = document.getElementById('darkthemestylesheet');
	darkthemestylesheet.setAttribute('media', 'none');
	changeWebsiteTheme('light');
	if (document.readyState == 'loading') {
		window.addEventListener('DOMContentLoaded', function(event) {
			changeDisqusTheme('light');
			refreshDisqusPanel();
		});
	} else {
		changeDisqusTheme('light');
		refreshDisqusPanel();
	}
	removeColorThemeBySystem();
	localStorage.setItem('themeSwitch', 'light');
	// console.log('light theme applied');
}

function setDefaultColorMode() {
	var darkthemestylesheet = document.getElementById('darkthemestylesheet');
	darkthemestylesheet.setAttribute('media', 'screen and (prefers-color-scheme: dark)');
	autoToggleColorThemeBySystem();
	setInitialColorTheme();
	localStorage.removeItem('themeSwitch');
	// console.log('default theme applied');
}



function initTheme() {
	var darkThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark');
	var lightThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'light');
	
	// update GUI switch
	/*document.addEventListener('DOMContentLoaded', function() {*/
		const themeValue = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue('content')
			.replace(/"/g, '');
		
		// Check if prefers-color-scheme is supported
		if (themeValue == 'light' || themeValue == 'dark' || themeValue == 'no-preference') {
			
			// Show all toggle options
			var themeToggleContainer = document.getElementById('theme-button-container');
			var themeToggleAuto = document.getElementById('theme-button-auto');
			var themeToggleDark = document.getElementById('theme-button-dark');
			var themeToggleLight = document.getElementById('theme-button-light');
			if(darkThemeSelected) {
				themeToggleContainer.className = 'reveal-labelled dark-theme-set';
			} else if (lightThemeSelected) {
				themeToggleContainer.className = 'reveal-labelled light-theme-set';
			} else {
				themeToggleContainer.className = 'reveal-labelled auto-theme-set';
			}
			themeToggleAuto.addEventListener('click', function(event) {
				setDarkMode();
				themeToggleContainer.className = 'reveal-labelled dark-theme-set';
			});
			themeToggleDark.addEventListener('click', function(event) {
				setLightMode();
				themeToggleContainer.className = 'reveal-labelled light-theme-set';
			});
			themeToggleLight.addEventListener('click', function(event) {
				setDefaultColorMode();
				themeToggleContainer.className = 'reveal-labelled auto-theme-set';
			});
		} else {
			
			// Show only light and dark toggle options
			var themeToggleContainer = document.getElementById('theme-button-container');
			var themeToggleDark = document.getElementById('theme-button-dark');
			var themeToggleLight = document.getElementById('theme-button-light');
			if(darkThemeSelected) {
				themeToggleContainer.className = 'reveal-labelled dark-theme-set';
			} else {
				themeToggleContainer.className = 'reveal-labelled light-theme-set';
			}
			themeToggleDark.addEventListener('click', function(event) {
				setLightMode();
				themeToggleContainer.className = 'reveal-labelled light-theme-set';
			});
			themeToggleLight.addEventListener('click', function(event) {
				setDarkMode();
				themeToggleContainer.className = 'reveal-labelled dark-theme-set';
			});
		} 
	/*});*/
}

if (document.readyState == 'loading') {
	window.addEventListener('DOMContentLoaded', function(event) {
		initTheme();
	});
} else {
	initTheme();
}

