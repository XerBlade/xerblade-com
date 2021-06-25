'use strict';

const defaultnoimage = "https://1.bp.blogspot.com/-nFUoiZWLdww/W20wJys8EzI/AAAAAAABtUw/uguC0eLLQuoiofVEKUqG5GYrPGigfpqoACLcBGAs/w576-h324-p-k-no-nu/no-thumb-square.jpg";
const maxresults = 3;
const norelatedpoststitle = "No related posts";
const canonicalHomeURL = "https://www.xerblade.com";
let relatedPosts = [];


// Asynchronous get script without JQuery
function loadScript(source) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.onload = () => { resolve(script); };
        script.onerror = () => { reject(new Error('Failed to load ' + source)); };

        script.src = source;
        document.head.appendChild(script);
    });
}

function handleRelatedPostFeedResults(jsonFeedContainer) {
    const numEntries = jsonFeedContainer.feed.entry.length;
    for (let i = 0; i < numEntries; i++) {
        const post = jsonFeedContainer.feed.entry[i];
        const relatedPost = {};
        relatedPost.title = post.title.$t;
        relatedPost.fullTitle = post.title.$t;
        try {
            if(post.media$thumbnail.url) {
                const thumbnail = post.media$thumbnail.url;
                relatedPost.thumbnail = thumbnail.replace("/s72-c/", "/w576-h324-p-k-no-nu/");
            }
        } catch (e) {
            const content = post.content.$t;
            const imgElementLocation = content.indexOf("<img");
            const imgSrcLocation = content.indexOf('src="', imgElementLocation);
            const imgUrlLocation = content.indexOf('"', imgSrcLocation + 5);
            const imgUrl = content.substr(imgSrcLocation + 5, imgUrlLocation - imgSrcLocation - 5);
            if (imgElementLocation != -1 && imgSrcLocation != -1 && imgUrlLocation != -1 && imgUrl != "") {
                relatedPost.thumbnail = imgUrl;
            } else if (typeof defaultnoimage != "undefined") {
                relatedPost.thumbnail = defaultnoimage;
            }  else {
                relatedPost.thumbnail = "https://3.bp.blogspot.com/-PpjfsStySz0/UF91FE7rxfI/AAAAAAAACl8/092MmUHSFQ0/w576-h324-p-k-no-nu/no_image.jpg";
            }
        }
        if (relatedPost.title.length > 35) {
            relatedPost.title = relatedPost.title.substring(0, 35) + "...";
        }
        const linkLength = post.link.length;
        for (let j = 0; j < linkLength; j++) {
            if (post.link[j].rel == "alternate") {
                relatedPost.url = post.link[j].href;
            }
        }
        
        relatedPosts.push(relatedPost);
    }
}

function removeRelatedDuplicates(currentURL) {
    let postsChecked = [];
    relatedPosts.forEach(post => {
        let noDuplicateFound = post.url != currentURL && postsChecked.every(previousPost => {
            if (post.url != previousPost.url) {
                return true;
            } else {
                return false;
            }
        });
        if (noDuplicateFound) {
            postsChecked.push(post);
        }
    });
    relatedPosts = postsChecked;
}

function shufflePosts() {
    const numPosts = relatedPosts.length;
    for (let i = numPosts - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [relatedPosts[i], relatedPosts[j]] = [relatedPosts[j], relatedPosts[i]];
    }
}

function printRelatedLabels() {
    const elem = document.getElementById("related-posts");
    if (!elem) {
        return;
    }
    
    while (elem.firstChild) {
        elem.firstChild.remove();
    }
    
    const numPosts = relatedPosts.length;
    
    if (numPosts == 0) {
        const noRelatedMessage = document.createElement('h4');
        noRelatedMessage.classList.add('card-panel');
        noRelatedMessage.appendChild(document.createTextNode(norelatedpoststitle));
        elem.appendChild(noRelatedMessage);
        return;
    }
    
    const numberUsed = numPosts < maxresults ? numPosts : maxresults;
    
    const row = document.createElement('div');
    row.classList.add('row');
    
    for (let i = 0; i < numberUsed; i++) {
        const postElem = document.createElement('div');
        postElem.classList.add('col');
        postElem.classList.add('s12');
        postElem.classList.add('m4');
        postElem.classList.add('l4');
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.title = relatedPosts[i].fullTitle;
        
        const link = document.createElement('a');
        link.href = relatedPosts[i].url;
        
        const imageFrame = document.createElement('div');
        imageFrame.classList.add('card-image');
        
        const picture = document.createElement('picture');
        
        const webpSource = document.createElement('source');
        webpSource.srcset = 
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w149-h84-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 149w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w210-h118-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 210w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w258-h145-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 258w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w297-h167-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 297w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w352-h198-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 352w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w576-h324-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 576w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w640-h360-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 640w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w800-h450-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 800w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w1024-h576-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 1024w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w1280-h720-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 1280w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w1440-h810-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 1440w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w1920-h1080-p-k-no-nu-rw/").replace(".jpg", ".webp").replace(".png", ".webp") + ' 1920w';
        webpSource.sizes = '(min-width: 1389px) 297px, (min-width: 993px) 22vw, (min-width: 601px) 26vw, (min-width: 451px) 96vw, 94vw';
        webpSource.type = "image/webp";
        
        const fallbackSource = document.createElement('source');
        fallbackSource.srcset = 
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w149-h84-p-k-no-nu/") + ' 149w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w210-h118-p-k-no-nu/") + ' 210w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w258-h145-p-k-no-nu/") + ' 258w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w297-h167-p-k-no-nu/") + ' 297w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w352-h198-p-k-no-nu/") + ' 352w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w576-h324-p-k-no-nu/") + ' 576w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w640-h360-p-k-no-nu/") + ' 640w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w800-h450-p-k-no-nu/") + ' 800w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w1024-h576-p-k-no-nu/") + ' 1024w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w1280-h720-p-k-no-nu/") + ' 1280w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w1440-h810-p-k-no-nu/") + ' 1440w, ' +
            relatedPosts[i].thumbnail.replace("/w576-h324-p-k-no-nu/", "/w1920-h1080-p-k-no-nu/") + ' 1920w';
        fallbackSource.sizes = '(min-width: 1389px) 297px, (min-width: 993px) 22vw, (min-width: 601px) 26vw, (min-width: 451px) 96vw, 94vw';
        
        const baseImg = document.createElement('img');
        baseImg.src = relatedPosts[i].thumbnail;
        baseImg.alt = '';
        
        picture.appendChild(webpSource);
        picture.appendChild(fallbackSource);
        picture.appendChild(baseImg);
        
        imageFrame.appendChild(picture);
        
        const cardTitle = document.createElement('div');
        cardTitle.classList.add('card-content');
        cardTitle.classList.add('imgpost');
        cardTitle.appendChild(document.createTextNode(relatedPosts[i].title));
        
        link.appendChild(imageFrame);
        link.appendChild(cardTitle);
        
        card.appendChild(link);
        postElem.appendChild(card);
        
        row.appendChild(postElem);
    }
    
    elem.appendChild(row);
}

const jsonscripts = document.labels.map(label => {
    return canonicalHomeURL + "/feeds/posts/default/-/" + label + "?alt=json-in-script&callback=handleRelatedPostFeedResults&max-results=6";
});

const currentURL = canonicalHomeURL + location.pathname;

if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
    let jsonrequests = jsonscripts.map(loadScript);

    Promise.all(jsonrequests).then(responses => {
        removeRelatedDuplicates(currentURL);
        shufflePosts();
        printRelatedLabels();
    });
} else {
    printRelatedLabels();
}
