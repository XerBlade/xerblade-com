'use strict';

// Begin format timestamps

// Standard date and time string
function formatDateTime(isod) {
    const date = moment(isod);
    
    const timeString = date.format('LLLL');

    return timeString;
}
// Same as before but without the time
function formatDateOnly(isod) {
    const date = moment(isod);
    
    const timeString = date.format('LL');

    return timeString;
}
// Abberivated data and time with like the slashes and stuff
function formatShortDateTime(isod) {
    const date = moment(isod);
    
    const dateString = date.format('l');
    const timeString = date.format('LT');

    return dateString + " – " + timeString;
}

function initDateTimes() {
    if (typeof moment === 'function') {
        const dateTime = document.querySelectorAll(".postDateTimeDisplay")
        dateTime.forEach(elem => {
            elem.textContent = formatDateTime(elem.getAttribute("content"));
        });
        const timeOnly = document.querySelectorAll(".postTimeOnlyDisplay")
        timeOnly.forEach(elem => {
            elem.parentNode.removeChild(elem);
        });
        const postDate = document.querySelectorAll(".postDateDisplay")
        postDate.forEach(elem => {
            elem.textContent = formatDateOnly(elem.getAttribute("content"));
        });
        const shortDateTime = document.querySelectorAll(".postShortDateTimeDisplay")
        shortDateTime.forEach(elem => {
            elem.textContent = formatShortDateTime(elem.getAttribute("content"));
        });
    } else {
        document.getElementById('momentjs').addEventListener('load', initDateTimes);
    }
}


// Begin move pages with individual meta descriptions into head element for search crawlers that don't check the body for those

function moveDescription() {
    const description = document.body.querySelector("meta[name='description']");

    if (description) {
        document.head.appendChild(description);
    }
}

// End meta description to head



// Begin Scroll to Top button
 
function initScrollToTopButton() {
    const scrollconfig = { threshold: 0 };
    const pixeltracking = document.getElementById('pixel-to-watch');

    if ('IntersectionObserver' in window) {
        const backToTopBtnContainer = document.getElementById("backToTopBtnContainer");
        const backToTopBtn = document.getElementById("backToTopBtn");
        function onIntersection(entries) {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0 && entry.target == pixeltracking) {
                    backToTopBtnContainer.classList.remove("visible");
                } else if (entry.intersectionRatio <= 0 && entry.target == pixeltracking) {
                    backToTopBtnContainer.classList.add("visible");
                }
            });
        }

        const observer = new IntersectionObserver(onIntersection, scrollconfig);
        observer.observe(pixeltracking);
    } else {
        document.getElementById("backToTopBtnContainer").classList.add("visible");
    }
}

// End Scroll to Top button


// Start lazyload Disqus and Related Posts

function initDisqusRelatedLazyload() {
    // Load disqus only when the document is scrolled till the top of the section where comments are supposed to appear.
    const disqusTarget = document.getElementById('disqus_thread');
    const relatedTarget = document.getElementById('related-posts');
    const lazyconfig = {
        rootmargin: '150px 0px',
        threshold: 0.01
    };

    // Which "related posts" should we be using?
    let relatedsrc, relatedhash, relatedtitle;
    if(window.location.href.indexOf("\/p\/") > -1) {
        relatedsrc = 'https://rawcdn.githack.com/XerBlade/xerblade-com-tracker/2ec133515ec78e8ab1de8f343f9b44ce07b1f30b/js/recentposts.min.js';
        relatedhash = 'sha384-xswaAyjukYzl4OeDKwGA/9BkHOxa0WygwYSZcF/KwWisbu3rEnN74PWhOsYY/mBy';
        relatedtitle = 'recent posts';
    } else {
        relatedsrc = 'https://rawcdn.githack.com/XerBlade/xerblade-com-tracker/2ec133515ec78e8ab1de8f343f9b44ce07b1f30b/js/relatedposts.min.js';
        relatedhash = 'sha384-fGVhh+QWfZcxf3vwUfS2StWGw910JobU9ZRGK7Usf62ak4MG09TTIBB/VTKWIMPi';
        relatedtitle = 'related posts';
    }

    function loadDisqus(target) {
        // Prepare the trigger and target
        const disqusEmpty = document.getElementById('disqus_empty');
        const disqusEmbed = document.createElement('script');

        // Load script asynchronously
        if (target) {
            disqusEmbed.onload = console.log("Disqus loaded.");
            disqusEmbed.src = 'https://xerblade.disqus.com/embed.js';
            document.head.appendChild(disqusEmbed);
            if (disqusEmpty) {
                disqusEmpty.remove();
            }
        }
    }

    function loadRelatedPosts(target) {

        const relatedEmbed = document.createElement('script');

        relatedEmbed.setAttribute('crossorigin', 'anonymous');
        relatedEmbed.setAttribute('integrity', relatedhash);
        relatedEmbed.onload = console.log("Related posts loaded.");
        relatedEmbed.onerror = () => {
            failedToLoadRelatedPosts();
            this.remove();
            throw(new Error('Failed to load ' + this.src));
        }
        relatedEmbed.src = relatedsrc;
        document.head.appendChild(relatedEmbed);
    }

    // If load failed, prepare error message and prompt to retry
    function failedToLoadRelatedPosts() {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const failedMessage = document.createElement('div');
        failedMessage.classList.add('card-content');
        failedMessage.appendChild(document.createTextNode('Failed to load ' + relatedtitle + '.'));
        
        const retryPrompt = document.createElement('div');
        retryPrompt.classList.add('card-action');
        
        const retryButton = document.createElement('button');
        retryButton.classList.add('btn');
        retryButton.classList.add('ripple');
        retryButton.classList.add('ripple-light');
        retryButton.onclick = () => {
            loadRelatedPosts(relatedTarget);
        }
        retryButton.appendChild(document.createTextNode('Retry'));
        retryPrompt.appendChild(retryButton);
        
        card.appendChild(failedMessage);
        card.appendChild(retryPrompt);
        
        relatedTarget.appendChild(card);
    }

    // If those don't exist, we know we're in the wrong place
    if (disqusTarget && relatedTarget) {

        let checkhash = window.location.hash;
        if (checkhash) {
            checkhash = checkhash.replace(/#/, "");
        }

        if ('IntersectionObserver' in window && !(checkhash.indexOf("comment-") == 0)) {
            function onLazyIntersection(entries) {
                if (entries) {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio > 0 && entry.target == disqusTarget) {
                            lazyobserver.unobserve(entry.target);
                            loadDisqus(entry.target);
                        } else if (entry.intersectionRatio > 0 && entry.target == relatedTarget) {
                            lazyobserver.unobserve(entry.target);
                            loadRelatedPosts(entry.target);
                        }
                    });
                }
            }
            const lazyobserver = new IntersectionObserver(onLazyIntersection, lazyconfig);
            lazyobserver.observe(disqusTarget);
            lazyobserver.observe(relatedTarget);
        } else {
            loadRelatedPosts(relatedTarget);
            loadDisqus(disqusTarget);
        }
    }
}

// End lazyload Disqus and Related Posts


// Start smooth scroll to comment thread

function initCommentLink() {
    const disquslink = document.getElementById("disqus-link");
    if (disquslink) {
        disquslink.addEventListener("click", event => {
            event.preventDefault();
            const disquspanel = document.getElementById("disqus_thread");
            disquspanel.scrollIntoView(true);
        });
    }
}

// End smooth scroll to comment thread


// Begin mobile native share button

function initShareButton() {
    if (navigator.share) {
        const sharebutton = document.getElementById('native-share-button');
        sharebutton.addEventListener('click', () => {
            const title = document.title;
            let url = document.location.href;
            const canonicalElement = document.querySelector('link[rel=canonical]');
            if (canonicalElement !== null) {
                url = canonicalElement.href;
            }
            const description = document.querySelector("meta[name='description']");
            const text = description ? description.content : '';
            navigator.share({
                title: title,
                text: text,
                url: url,
            })
            .then(() => { console.log('Successful share') })
            .catch(error => { console.error('Error sharing', error) });
        });
        sharebutton.classList.remove('hide');
        const classicsharebuttons = document.querySelector('.share-btns');
        if (classicsharebuttons) {
            classicsharebuttons.classList.add('hide');
        }
    }
}

// End mobile native share button


// Start custom form validation display

function initFormValidation() {
    document.querySelectorAll('.validate').forEach(input => {
        input.addEventListener('invalid', ev => {
            ev.preventDefault();
            input.classList.add('invalid');
            
            function removeInvalid() {
                input.classList.remove('invalid');
                input.removeEventListener('input', removeInvalid);
            }
            input.addEventListener('input', removeInvalid);
        });
    });
}

// End custom form validation display


// Start initialize modal popups

function initModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        const target = trigger.dataset.target;
        const modal = document.getElementById(target);
        trigger.onclick = (e) => {
            modal.classList.add('open');
            modal.querySelector('input[required]').focus();
            const overlay = document.querySelector('.modal-overlay');
            overlay.onclick = () => {
                modal.classList.remove('open');
            }
        };
        trigger.href = 'javascript:void(0)';
        modal.querySelector('form').addEventListener('submit', () => {
            modal.classList.remove('open');
        });
        modal.querySelector('.modal-close').onclick = () => {
            modal.classList.remove('open');
        }
    });
}

// End initialize modal popups


function init() {
    initDateTimes();
    moveDescription();
    initScrollToTopButton();
    initDisqusRelatedLazyload();
    initCommentLink();
    initShareButton();
    initFormValidation();
    initModals();
}

if (document.readyState == 'loading') {
    window.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
