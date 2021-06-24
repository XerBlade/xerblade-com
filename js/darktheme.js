'use strict';

// Replace meta tags for dark mode
function changeWebsiteTheme(scheme) {
	const metatags = document.head.getElementsByTagName("meta");

	if (metatags.length == 0) return;  // skip if not found

	for (let i = metatags.length-1; i >= 0; i--) {
        const name = metatags[i].getAttribute('name');
        if (name) {
            if (name == 'theme-color') {
                metatags[i].remove();
            } else if (name == 'msapplication-navbutton-color') {
                metatags[i].remove();
            } else if (name == 'apple-mobile-web-app-status-bar-style') {
                metatags[i].remove();
            }
        }
	}
	
	if (scheme === 'dark') {
		const link = document.createElement('meta');
		link.setAttribute('name', 'theme-color');
		link.content = "#2E2E2E";
		document.head.appendChild(link);
		const link2 = document.createElement('meta');
		link2.setAttribute('name', 'msapplication-navbutton-color');
		link2.content = "#2E2E2E";
		document.head.appendChild(link2);
		const link3 = document.createElement('meta');
		link3.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
		link3.content = "#2E2E2E";
		document.head.appendChild(link3);
	} else if (scheme === 'light') {
		const link = document.createElement('meta');
		link.setAttribute('name', 'theme-color');
		link.content = "#f44336";
		document.head.appendChild(link);
		const link2 = document.createElement('meta');
		link2.setAttribute('name', 'msapplication-navbutton-color');
		link2.content = "#f44336";
		document.head.appendChild(link2);
		const link3 = document.createElement('meta');
		link3.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
		link3.content = "#f44336";
		document.head.appendChild(link3);
	}
}

function changeDisqusTheme(scheme) {
	if (scheme === 'dark') {
		const comments = document.getElementById("comments");
		if (comments) {
			comments.style.backgroundColor = "rgba(30,30,30,1)";
			comments.style.color = "rgba(255,255,255,0.87)";
		}
	} else if (scheme === 'light') {
		const comments = document.getElementById("comments");
		if (comments) {
			comments.style.backgroundColor = "rgb(255,255,255)";
			comments.style.color = "rgba(0, 0, 0, 0.87);";
		}
	}
}

function refreshDisqusPanel() {
	if (typeof DISQUS !== 'undefined' && DISQUS !== null) {
		DISQUS.reset({
            reload: true,
            config: () => {
                this.page.identifier = this.page.identifier;  
                this.page.url = document.canonicalPageURL;
            }
		});
	}
}

let mqDark = {};
let mqLight = {};
if (window.matchMedia) {
	mqDark = window.matchMedia('(prefers-color-scheme: dark)');
	mqLight = window.matchMedia('(prefers-color-scheme: light)');
}

function themeColorListener(matchesMedia) {
	const matches = matchesMedia.matches;
	const media = matchesMedia.media;
	if(!matches) { // Not matching anymore = not interesting
		return;
	}
	if(media === '(prefers-color-scheme: dark)') {
		changeWebsiteTheme('dark');
        changeDisqusTheme('dark');
        refreshDisqusPanel();
	} else if (media === '(prefers-color-scheme: light)') {
		changeWebsiteTheme('light');
        changeDisqusTheme('light');
        refreshDisqusPanel();
	}
}

function autoToggleColorThemeBySystem() {
	if(window.matchMedia) {
		mqDark.addListener(themeColorListener);
		mqLight.addListener(themeColorListener);
	}
}

function removeColorThemeBySystem() {
	if(window.matchMedia) {
		mqDark.removeListener(themeColorListener);
		mqLight.removeListener(themeColorListener);
	}
}

function setInitialColorTheme() {
	const theme = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue('content')
		.replace(/"/g, '');
		
	if (theme == 'dark') {
		changeWebsiteTheme('dark');
        changeDisqusTheme('dark');
        refreshDisqusPanel();
	} else {
		changeWebsiteTheme('light');
        changeDisqusTheme('light');
        refreshDisqusPanel();
	}
}

function setDarkMode() {
	const darkthemestylesheet = document.getElementById('darkthemestylesheet');
	darkthemestylesheet.setAttribute('media', 'screen');
	changeWebsiteTheme('dark');
    changeDisqusTheme('dark');
    refreshDisqusPanel();
	removeColorThemeBySystem();
	localStorage.setItem('themeSwitch', 'dark');
}


function setLightMode() {
	const darkthemestylesheet = document.getElementById('darkthemestylesheet');
	darkthemestylesheet.setAttribute('media', 'none');
	changeWebsiteTheme('light');
    changeDisqusTheme('light');
    refreshDisqusPanel();
	removeColorThemeBySystem();
	localStorage.setItem('themeSwitch', 'light');
}

function setDefaultColorMode() {
	const darkthemestylesheet = document.getElementById('darkthemestylesheet');
	darkthemestylesheet.setAttribute('media', 'screen and (prefers-color-scheme: dark)');
	autoToggleColorThemeBySystem();
	setInitialColorTheme();
	localStorage.removeItem('themeSwitch');
}



function initTheme() {
	const darkThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark');
	const lightThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'light');
	
	// update GUI switch
    const themeValue = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('content')
        .replace(/"/g, '');
    
    // Check if prefers-color-scheme is supported
    if (themeValue == 'light' || themeValue == 'dark' || themeValue == 'no-preference') {
        // Show all toggle options
        const themeToggleContainer = document.getElementById('theme-button-container');
        const themeToggleAuto = document.getElementById('theme-button-auto');
        const themeToggleDark = document.getElementById('theme-button-dark');
        const themeToggleLight = document.getElementById('theme-button-light');
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
        const themeToggleContainer = document.getElementById('theme-button-container');
        const themeToggleDark = document.getElementById('theme-button-dark');
        const themeToggleLight = document.getElementById('theme-button-light');
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
}

initTheme();

