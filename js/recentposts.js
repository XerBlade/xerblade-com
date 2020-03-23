/* Set up recent posts */
'use strict';

var defaultnoimage = "https://1.bp.blogspot.com/-nFUoiZWLdww/W20wJys8EzI/AAAAAAABtUw/uguC0eLLQuoiofVEKUqG5GYrPGigfpqoACLcBGAs/w576-h324-p-k-no-nu/no-thumb-square.jpg",
    maxresults = 3,
    relatedpoststitle = " Recent Posts",
    norelatedpoststitle = " No recent posts",
    relatedTitles = new Array,
    relatedTitlesFull = new Array,
    relatedTitlesNum = 0,
    relatedUrls = new Array,
    thumburl = new Array,
	canonicalHomeURL = "https://www.xerblade.com/";

// Asynchronous get script without JQuery
function loadScript(source) {
	return new Promise(function(resolve, reject) {
		let script = document.createElement('script');

		script.async = true;

		script.onload = function() { resolve(script); }
		script.onerror = function() { reject(new Error('Failed to load ' + source)); }

		script.src = source;
		document.head.appendChild(script);
	});
}

// Alternative version when that doesn't work
function loadScriptIE(source, callback) {
	let script = document.createElement('script');
	script.src = source;

	script.onload = function() { window.requestAnimationFrame(callback(null, script)); }
	script.onerror = function() { callback(new Error('Failed to load ' + source)); }

	document.head.appendChild(script);
}


function related_results_labels_thumbs(e) {
	var s, a, b, c, d, tt;
    for (var t = 0; t < e.feed.entry.length; t++) {
        var l = e.feed.entry[t];
        relatedTitles[relatedTitlesNum] = l.title.$t;
        relatedTitlesFull[relatedTitlesNum] = l.title.$t;
        try {
            l.media$thumbnail.url && (tt = l.media$thumbnail.url, thumburl[relatedTitlesNum] = tt.replace("/s72-c/", "/w576-h324-p-k-no-nu/"))
        } catch (r) {
            s = l.content.$t, a = s.indexOf("<img"), b = s.indexOf('src="', a), c = s.indexOf('"', b + 5), d = s.substr(b + 5, c - b - 5), -1 != a && -1 != b && -1 != c && "" != d ? thumburl[relatedTitlesNum] = d : "undefined" != typeof defaultnoimage ? thumburl[relatedTitlesNum] = defaultnoimage : thumburl[relatedTitlesNum] = "https://3.bp.blogspot.com/-PpjfsStySz0/UF91FE7rxfI/AAAAAAAACl8/092MmUHSFQ0/w576-h324-p-k-no-nu/no_image.jpg"
        }
        relatedTitles[relatedTitlesNum].length > 35 && (relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 35) + "...");
        for (var i = 0; i < l.link.length; i++) "alternate" == l.link[i].rel && (relatedUrls[relatedTitlesNum] = l.link[i].href, relatedTitlesNum++)
    }
}

var postsHTML = "";
function concatstrings (a,b) {
	postsHTML = postsHTML.concat(b);
}

function removeRelatedDuplicates() {
    for (var e = new Array(0), t = new Array(0), f = new Array(0), l = new Array(0), r = 0; r < relatedUrls.length; r++) contains_thumbs(e, relatedUrls[r]) || (e.length += 1, e[e.length - 1] = relatedUrls[r], t.length += 1, f.length += 1, l.length += 1, t[t.length - 1] = relatedTitles[r], f[f.length - 1] = relatedTitlesFull[r], l[l.length - 1] = thumburl[r]);
    relatedTitles = t, relatedTitlesFull = f, relatedUrls = e, thumburl = l;
}

function contains_thumbs(e, t) {
    for (var l = 0; l < e.length; l++)
        if (e[l] == t) return true;
    return false;
}

function printRelatedLabels(e) {
    var t;
    t = "undefined" != typeof splittercolor ? splittercolor : "#DDDDDD";
    for (var l = 0; l < relatedUrls.length; l++) relatedUrls[l] != e && relatedTitles[l] || (relatedUrls.splice(l, 1), relatedTitles.splice(l, 1), relatedTitlesFull.splice(l, 1), thumburl.splice(l, 1), l--);
    var r = Math.floor((relatedTitles.length - 1) * Math.random()),
        l = 0;
	
    for (0 == relatedTitles.length && concatstrings(postsHTML, "<h4 class='card-panel'>" + norelatedpoststitle + "</h4>"), relatedTitles.length > 0 && concatstrings(postsHTML, "<h4>" + relatedpoststitle + "</h4>"), concatstrings(postsHTML, '<div class="row">'); l < relatedTitles.length && 20 > l && maxresults > l;) concatstrings(postsHTML, '<div class="col s12 m4 l4"><div class="card" title="' + relatedTitlesFull[r] + '"><a'), 0 != l ? concatstrings(postsHTML, ' ') : concatstrings(postsHTML, ' '), concatstrings(postsHTML, 'href="' + relatedUrls[r] + '"><div class="card-image"><picture><source data-srcset="' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w297-h167-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 297w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w258-h145-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 258w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w210-h118-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 210w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w149-h84-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 149w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w352-h198-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 352w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w576-h324-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 576w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w640-h360-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 640w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w800-h450-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 800w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w1024-h576-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 1024w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w1280-h720-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 1280w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w1440-h810-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 1440w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w1920-h1080-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 1920w" sizes="(min-width: 1389px) 297px, (min-width: 993px) 22vw, (min-width: 601px) 26vw, (min-width: 451px) 96vw, 94vw" type="image/webp"/><source data-srcset="' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w297-h167-p-k-no-nu/") + ' 297w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w258-h145-p-k-no-nu/") + ' 258w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w210-h118-p-k-no-nu/") + ' 210w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w149-h84-p-k-no-nu/") + ' 149w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w352-h198-p-k-no-nu/") + ' 352w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w576-h324-p-k-no-nu/") + ' 576w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w640-h360-p-k-no-nu/") + ' 640w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w800-h450-p-k-no-nu/") + ' 800w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w1024-h576-p-k-no-nu/") + ' 1024w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w1280-h720-p-k-no-nu/") + ' 1280w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w1440-h810-p-k-no-nu/") + ' 1440w, ' + thumburl[r].replace("/w576-h324-p-k-no-nu/", "/w1920-h1080-p-k-no-nu/") + ' 1920w" sizes="(min-width: 1389px) 297px, (min-width: 993px) 22vw, (min-width: 601px) 26vw, (min-width: 451px) 96vw, 94vw" type="image/jpeg"/><img class="lazyload" data-src="' + thumburl[r] + '" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="" loading="lazy"/></picture></div><div class="card-content imgpost">' + relatedTitles[r] + "</div></a></div></div>"), l++, r < relatedTitles.length - 1 ? r++ : r = 0;
    concatstrings(postsHTML, "</div>"), relatedUrls.splice(0, relatedUrls.length), thumburl.splice(0, thumburl.length), relatedTitles.splice(0, relatedTitles.length);
	var elem = document.getElementById("related-posts");
	
	if (elem) {
		elem.innerHTML = postsHTML;
	}
}

function addStaticPages() {
	var container = {feed: {entry: new Array}};
	
	// Fate/stay night walkthrough
	var entry = {};
	entry.title = {$t: "Fate\/stay night Walkthrough"};
	entry.media$thumbnail = {url: "https:\/\/4.bp.blogspot.com\/-cEYayuesa_o\/W2uZj62yRwI\/AAAAAAABtSU\/oSpzioyhJMgbyVqr-Y4FqDTM__8P-MphgCLcBGAs\/s72-c\/FSN%2BTitle%2B2.jpg"};
	entry.content = {$t : ""};
	entry.link = [{rel: "alternate", href: "https:\/\/www.xerblade.com\/p\/fate-stay-night-walkthrough.html"}];
	container.feed.entry.push(entry);
	
	// Tsukihime walkthrough
	var entry2 = {};
	entry2.title = {$t: "Tsukihime Walkthrough"};
	entry2.media$thumbnail = {url: "https:\/\/1.bp.blogspot.com\/-gYp9QT9Nu-I\/W0eacPHXnCI\/AAAAAAABr5o\/jTcKc0eyLMggZUrg6hQzF_OzSy6kshQFQCLcBGAs\/s72-c\/TsukihimeArc.png"};
	entry2.content = {$t : ""};
	entry2.link = [{rel: "alternate", href: "https:\/\/www.xerblade.com\/p\/tsukihime-walkthrough.html"}];
	container.feed.entry.push(entry2);
	
	// Fate/Extra walkthrough
	var entry3 = {};
	entry3.title = {$t: "Fate\/Extra Walkthrough"};
	entry3.media$thumbnail = {url: "https:\/\/2.bp.blogspot.com\/-arRYKUGDMCw\/W0f8mH540FI\/AAAAAAABr9U\/XztFFaEntlQ7EC6udj7269OWd1E-FFPCACLcBGAs\/s72-c\/ExtraFeMC.jpg"};
	entry3.content = {$t : ""};
	entry3.link = [{rel: "alternate", href: "https:\/\/www.xerblade.com\/p\/fateextra-walkthrough.html"}];
	container.feed.entry.push(entry3);
	
	// Detective Conan Important Episode List
	var entry4 = {};
	entry4.title = {$t: "Detective Conan Important Episode List"};
	entry4.media$thumbnail = {url: "https:\/\/4.bp.blogspot.com\/-LaB_k5Nwljk\/W0f9xYvWc5I\/AAAAAAABr90\/-nmhOoFQ7o8p6m7GP5KUNs_e6n5JZA2fwCLcBGAs\/s72-c\/ConanBanner%2B%25283%2529.jpg"};
	entry4.content = {$t : ""};
	entry4.link = [{rel: "alternate", href: "https:\/\/www.xerblade.com\/p\/detective-conan-important-episode-list.html"}];
	container.feed.entry.push(entry4);
	
	related_results_labels_thumbs(container);
}

var url = [location.protocol, '//', location.host, location.pathname].join('');

/*$.getScript(canonicalHomeURL + "feeds/posts/default?redirect=false&alt=json-in-script&callback=related_results_labels_thumbs&max-results=6").done(function(script, textStatus) {
	addStaticPages();
    removeRelatedDuplicates();
	printRelatedLabels(url);
});*/

if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
	loadScript(canonicalHomeURL + "feeds/posts/default?redirect=false&alt=json-in-script&callback=related_results_labels_thumbs&max-results=6").then(
		function(script) {
			addStaticPages();
			removeRelatedDuplicates();
			printRelatedLabels(url);
		},
		function(error) { console.error("Error: ${error.message}") }
	);
} else {
	// Fallback for... IE basically
	loadScriptIE(canonicalHomeURL + "feeds/posts/default?redirect=false&alt=json-in-script&callback=related_results_labels_thumbs&max-results=6", function(script) {
		addStaticPages();
		removeRelatedDuplicates();
		printRelatedLabels(url);
	});
}
