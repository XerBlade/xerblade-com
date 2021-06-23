'use strict';

// NodeList.forEach polyfill

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// End NodeList.forEach polyfill

// Begin format timestamps

function formatDateTime(isod) {

    //console.log(isod);
    var d = moment(isod);
    
    var timeString = d.format('LLLL');

    return timeString;
}
function formatDateOnly(isod) {

    //console.log(isod);
    var d = moment(isod);
    
    var timeString = d.format('LL');

    return timeString;
}
function formatShortDateTime(isod) {

    //console.log(isod);
    var d = moment(isod);
    
    var dateString = d.format('l');
    var timeString = d.format('LT');

    return dateString + " – " + timeString;
}

document.addEventListener('DOMContentLoaded', function() {
    const dateTime = document.querySelectorAll(".postDateTimeDisplay")
    Array.prototype.forEach.call(dateTime, function(elem) {
        elem.textContent = formatDateTime(elem.getAttribute("content"));
    });
    const timeOnly = document.querySelectorAll(".postTimeOnlyDisplay")
    Array.prototype.forEach.call(timeOnly, function(elem) {
        elem.parentNode.removeChild(elem);
    });
    const postDate = document.querySelectorAll(".postDateDisplay")
    Array.prototype.forEach.call(postDate, function(elem) {
        elem.textContent = formatDateOnly(elem.getAttribute("content"));
    });
    const shortDateTime = document.querySelectorAll(".postShortDateTimeDisplay")
    Array.prototype.forEach.call(shortDateTime, function(elem) {
        elem.textContent = formatShortDateTime(elem.getAttribute("content"));
    });
});



// Begin move pages with individual meta descriptions into head element for search crawlers that don't check the body for those

var description = document.body.querySelector("meta[name='description']");

if (!!description) {
    //console.log('description found in body');
    description.parentNode.removeChild(description);
    document.head.appendChild(description);
}

// End meta description to head



// Begin Scroll to Top button
 
    var scrollconfig = { threshold: 0 };
    var pixeltracking = document.getElementById('pixel-to-watch');
    
    
    
    if ('IntersectionObserver' in window) {
        var backToTopBtnContainer = document.getElementById("backToTopBtnContainer");
        var backToTopBtn = document.getElementById("backToTopBtn");
        function onIntersection(entries) {
            entries.forEach(function(entry) {
                if (entry.intersectionRatio > 0 && entry.target == pixeltracking) {
                    backToTopBtnContainer.classList.remove("visible");
                    backToTopBtn.tabIndex = -1;
                } else if (entry.intersectionRatio <= 0 && entry.target == pixeltracking) {
                    backToTopBtnContainer.classList.add("visible");
                    backToTopBtn.tabIndex = 0;
                }
            });
        }
    
        let observer = new IntersectionObserver(onIntersection, scrollconfig);
        observer.observe(pixeltracking);
    } else {
        document.getElementById("backToTopBtnContainer").classList.add("visible");
    }
 


// End Scroll to Top button

// Start lazyload Disqus and Related Posts

/*
 * Load disqus only when the document is scrolled till the top of the
 * section where comments are supposed to appear.
 */
var disqus_target = document.getElementById('disqus_thread');
var related_target = document.getElementById('related-posts');
var lazyconfig = {
    rootmargin: '150px 0px',
    threshold: 0.01
};

// Which "related posts" should we be using?
var relatedsrc, relatedhash, relatedtitle;
if(window.location.href.indexOf("\/p\/") > -1) {
    relatedsrc = 'https://rawcdn.githack.com/XerBlade/xerblade-com-tracker/269a8b44dad660053a1c7350c0769af76f6636d9/js/recentposts.min.js';
    relatedhash = 'sha384-L+BqG4uutIJAkHsmHpe1JSI+JUCYu++Zqz/ym48MxILipgV/xKIz4OYCaZi61e7Y';
    relatedtitle = 'recent posts';
} else {
    relatedsrc = 'https://rawcdn.githack.com/XerBlade/xerblade-com-tracker/269a8b44dad660053a1c7350c0769af76f6636d9/js/relatedposts.min.js';
    relatedhash = 'sha384-0tBxUs5FsS8Jev/6xNtfe1CjdKWq132t7Gm4HF/gUcfd6fR5z3VadiRateAZCRT7';
    relatedtitle = 'related posts';
}

function loadDisqus(target) {
    // Prepare the trigger and target
    var is_disqus_empty = document.getElementById('disqus_empty'),
        disqus_embed    = document.createElement('script');

    // Load script asynchronously
    if (target) {
        disqus_embed.onload = console.log("Disqus loaded.");
        disqus_embed.src = 'https://xerblade.disqus.com/embed.js';
        document.head.appendChild(disqus_embed);
        if (is_disqus_empty && is_disqus_empty.parentNode) {
            is_disqus_empty.parentNode.removeChild(is_disqus_empty);
        }
    }
}

function loadRelatedPosts(target) {

    var related_embed = document.createElement('script');

    related_embed.crossorigin = 'anonymous';
    related_embed.integrity = relatedhash;
    related_embed.onload = console.log("Related posts loaded.");
    related_embed.onerror = function() {
        failedToLoadRelatedPosts();
        this.parentNode.removeChild(this);
        throw(new Error('Failed to load ' + this.src));
    }
    related_embed.src = relatedsrc;
    document.head.appendChild(related_embed);
}

function failedToLoadRelatedPosts() {
    console.log("failedToLoadRelatedPosts()");
    related_target.innerHTML = `
        <div class='card'>
            <div class='card-content'>Failed to load ` + relatedtitle + `.</div>
            <div class='card-action'><button class='btn ripple ripple-light' onclick='loadRelatedPosts(document.getElementById("related-posts"))'>Retry</button></div>
        </div>
    `;
}

// If those don't exist, we know we're in the wrong place
if (disqus_target && related_target) {

    var checkhash = window.location.hash;
    if (checkhash) {
        checkhash = checkhash.replace(/#/, "");
    }

    if ('IntersectionObserver' in window && !(checkhash.indexOf("comment-") == 0)) {
        function onLazyIntersection(entries) {
            if (!!entries) {
                entries.forEach(function(entry) {
                    if (entry.intersectionRatio > 0 && entry.target == disqus_target) {
                        lazyobserver.unobserve(entry.target);
                        loadDisqus(entry.target);
                    } else if (entry.intersectionRatio > 0 && entry.target == related_target) {
                        lazyobserver.unobserve(entry.target);
                        loadRelatedPosts(entry.target);
                    }
                });
            }
        }
        let lazyobserver = new IntersectionObserver(onLazyIntersection, lazyconfig);
        if (document.readyState == 'loading') {
            window.addEventListener('DOMContentLoaded', function(event) {
                lazyobserver.observe(disqus_target);
                lazyobserver.observe(related_target);
            });
        } else {
            lazyobserver.observe(disqus_target);
            lazyobserver.observe(related_target);
        }
    } else {
        if (document.readyState == 'loading') {
            window.addEventListener('DOMContentLoaded', function(event) {
                loadRelatedPosts(related_target);
                loadDisqus(disqus_target);
            });
        } else {
            loadRelatedPosts(related_target);
            loadDisqus(disqus_target);
        }
    }
}

// End lazyload Disqus and Related Posts

// Start smooth scroll to comment thread

var disquslink = document.getElementById("disqus-link");
if (!!disquslink) {
    disquslink.addEventListener("click", function(event) {

        event.preventDefault();
        
        var disquspanel = document.getElementById("disqus_thread");

        disquspanel.focus();

        return false;

    });
}

// End smooth scroll to comment thread


// Begin mobile native share button


    if (navigator.share) {
        var sharebutton = document.getElementById('native-share-button');
        sharebutton.addEventListener('click', function() {
            const title = document.title;
            let url = document.location.href;
            const canonicalElement = document.querySelector('link[rel=canonical]');
            if (canonicalElement !== null) {
                url = canonicalElement.href;
            }
            // const text = 'Check out this page';
            navigator.share({
                title: title,
                // text: text,
                url: url,
            })
            .then(function() { console.log('Successful share') })
            .catch(function(error) { console.log('Error sharing', error) });
        });
        sharebutton.classList.remove('hide');
        var classicsharebuttons = document.querySelector('.share-btns');
        if (!!classicsharebuttons) {
            classicsharebuttons.classList.add('hide');
        }
    }

// End mobile native share button


// Start custom form validation display

document.querySelectorAll(".validate").forEach(function(input) {
    input.addEventListener("invalid", function(event) {
        event.preventDefault();
        this.classList.add("invalid");
        this.addEventListener("input", function(event) {
            this.classList.remove("invalid");
        });
    });
});

// End custom form validation display


// Start initialize modal popups

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
        modal.classList.remove('open')
    });
    modal.querySelector('.modal-close').onclick = () => {
        modal.classList.remove('open');
    }
});

// End initialize modal popups
