'use strict';

var tabs = {};

//<![CDATA[
/*document.addEventListener('DOMContentLoaded', function() {
	var elem = document.querySelector('.tabs');
	instance = M.Tabs.init(elem, {
		swipeable: false
	});
	var elems2 = document.querySelectorAll('.pagination');
	elems2.forEach(element =>(element.classList.remove('hide')));
	var elem3 = document.getElementById('tab-contents');
	elem3.classList.add("tabs-loaded");
});*/

function removeHash () { 
	var scrollV, scrollH, loc = window.location;
	if ("replaceState" in history)
		history.replaceState("", document.title, loc.pathname + loc.search);
	else {
		// Prevent scrolling by storing the page's current scroll offset
		scrollV = document.body.scrollTop;
		scrollH = document.body.scrollLeft;

		loc.hash = "";

		// Restore the scroll offset, should be flicker free
		document.body.scrollTop = scrollV;
		document.body.scrollLeft = scrollH;
	}
}

if (window.location.hash) {
	var hash = window.location.hash;
	if (hash) {
		hash = hash.replace(/#/, "");
		// console.log("hash: ", hash);
		removeHash();
		if (document.readyState == 'loading') {
			window.addEventListener("DOMContentLoaded", function(e) {
				try {
					document.getElementById(hash).scrollIntoView(true);
				} catch(err) {
					window.location.hash = hash;
					hash = null;
				}
			});
		} else {
			try {
				document.getElementById(hash).scrollIntoView(true);
			} catch(err) {
				window.location.hash = hash;
				hash = null;
			}
			
		}
	}
}

function changePageIndicator(index) {
	// console.log("page number: ", index);
	var paginators = document.querySelectorAll(".paginate");
	Array.prototype.forEach.call(paginators, function(paginator) {
		// paginator.classList.add("ripple");
		paginator.classList.remove("disabled");
		paginator.classList.remove("active");
		paginator.firstElementChild.removeAttribute('disabled');
	});
	
	switch (index) {
	case 1:
		var page1s = document.querySelectorAll(".page1");
		var pageprevs = document.querySelectorAll(".pageprev");
		Array.prototype.forEach.call(page1s, function(page1) {
			//page1.classList.remove("ripple");
			page1.classList.add("active");
			page1.firstElementChild.setAttribute('disabled', true);
		});
		Array.prototype.forEach.call(pageprevs, function(pageprev) {
			//pageprev.classList.remove("ripple");
			pageprev.classList.add("disabled");
			pageprev.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 2:
		var page2s = document.querySelectorAll(".page2");
		Array.prototype.forEach.call(page2s, function(page2) {
			//page2.classList.remove("ripple");
			page2.classList.add("active");
			page2.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 3:
		var page3s = document.querySelectorAll(".page3");
		Array.prototype.forEach.call(page3s, function(page3) {
			//page3.classList.remove("ripple");
			page3.classList.add("active");
			page3.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 4:
		var page4s = document.querySelectorAll(".page4");
		Array.prototype.forEach.call(page4s, function(page4) {
			//page4.classList.remove("ripple");
			page4.classList.add("active");
			page4.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 5:
		var page5s = document.querySelectorAll(".page5");
		Array.prototype.forEach.call(page5s, function(page5) {
			//page5.classList.remove("ripple");
			page5.classList.add("active");
			page5.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 6:
		var page6s = document.querySelectorAll(".page6");
		Array.prototype.forEach.call(page6s, function(page6) {
			//page6.classList.remove("ripple");
			page6.classList.add("active");
			page6.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 7:
		var page7s = document.querySelectorAll(".page7");
		Array.prototype.forEach.call(page7s, function(page7) {
			//page7.classList.remove("ripple");
			page7.classList.add("active");
			page7.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 8:
		var page8s = document.querySelectorAll(".page8");
		Array.prototype.forEach.call(page8s, function(page8) {
			//page8.classList.remove("ripple");
			page8.classList.add("active");
			page8.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 9:
		var page9s = document.querySelectorAll(".page9");
		Array.prototype.forEach.call(page9s, function(page9) {
			//page9.classList.remove("ripple");
			page9.classList.add("active");
			page9.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 10:
		var page10s = document.querySelectorAll(".page10");
		Array.prototype.forEach.call(page10s, function(page10) {
			//page10.classList.remove("ripple");
			page10.classList.add("active");
			page10.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 11:
		var page11s = document.querySelectorAll(".page11");
		Array.prototype.forEach.call(page11s, function(page11) {
			//page11.classList.remove("ripple");
			page11.classList.add("active");
			page11.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 12:
		var page12s = document.querySelectorAll(".page12");
		Array.prototype.forEach.call(page12s, function(page12) {
			//page12.classList.remove("ripple");
			page12.classList.add("active");
			page12.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 13:
		var page13s = document.querySelectorAll(".page13");
		Array.prototype.forEach.call(page13s, function(page13) {
			//page13.classList.remove("ripple");
			page13.classList.add("active");
			page13.firstElementChild.setAttribute('disabled', true);
		});
		break;
	case 14:
		var page14s = document.querySelectorAll(".page14");
		var pagenexts = document.querySelectorAll(".pagenext");
		Array.prototype.forEach.call(page14s, function(page14) {
			//page14.classList.remove("ripple");
			page14.classList.add("active");
			page14.firstElementChild.setAttribute('disabled', true);
		});
		Array.prototype.forEach.call(pagenexts, function(pagenext) {
			//pagenext.classList.remove("ripple");
			pagenext.classList.add("disabled");
			pagenext.firstElementChild.setAttribute('disabled', true);
		});
		break;
	}
}

/*function GoToTab(tabid) {
	var currTab = instance.index;
	currTab++;
	
	if (tabid == 'prev') {
		currTab--;
		switch (currTab) {
			case 0: return false;
			case 1: tabid = 'tabintro'; break;
			case 2: tabid = 'tabstats'; break;
			case 3: tabid = 'tabfaq'; break;
			case 4: tabid = 'tab00'; break;
			case 5: tabid = 'tab100'; break;
			case 6: tabid = 'tab200'; break;
			case 7: tabid = 'tab300'; break;
			case 8: tabid = 'tab400'; break;
			case 9: tabid = 'tab500'; break;
			case 10: tabid = 'tab600'; break;
			case 11: tabid = 'tab700'; break;
			case 12: tabid = 'tab800'; break;
			case 13: tabid = 'tab900'; break;
		}
	} else if (tabid == 'next') {
		currTab++;
		switch (currTab) {
			case 1: tabid = 'tabintro'; break;
			case 2: tabid = 'tabstats'; break;
			case 3: tabid = 'tabfaq'; break;
			case 4: tabid = 'tab00'; break;
			case 5: tabid = 'tab100'; break;
			case 6: tabid = 'tab200'; break;
			case 7: tabid = 'tab300'; break;
			case 8: tabid = 'tab400'; break;
			case 9: tabid = 'tab500'; break;
			case 10: tabid = 'tab600'; break;
			case 11: tabid = 'tab700'; break;
			case 12: tabid = 'tab800'; break;
			case 13: tabid = 'tab900'; break;
			case 14: return false;
		}
	}

	instance.select(tabid);
	// $('ul.tabs').tabs('select_tab', tabid);
	
	currTab = instance.index;
	currTab++;
	changePageIndicator(currTab);
}*/

function GoToTab(tabid) {
	// console.log('index before: ' + tabs.index);
	
	if (tabid == 'prev') {
		tabs.index--;
		switch (tabs.index) {
			case 0: return false;
			case 1: tabid = 'tabintro'; break;
			case 2: tabid = 'tabstats'; break;
			case 3: tabid = 'tabfaq'; break;
			case 4: tabid = 'tab00'; break;
			case 5: tabid = 'tab100'; break;
			case 6: tabid = 'tab200'; break;
			case 7: tabid = 'tab300'; break;
			case 8: tabid = 'tab400'; break;
			case 9: tabid = 'tab500'; break;
			case 10: tabid = 'tab600'; break;
			case 11: tabid = 'tab700'; break;
			case 12: tabid = 'tab800'; break;
			case 13: tabid = 'tab900'; break;
			case 14: tabid = 'tabupcoming'; break;
		}
	} else if (tabid == 'next') {
		tabs.index++;
		switch (tabs.index) {
			case 1: tabid = 'tabintro'; break;
			case 2: tabid = 'tabstats'; break;
			case 3: tabid = 'tabfaq'; break;
			case 4: tabid = 'tab00'; break;
			case 5: tabid = 'tab100'; break;
			case 6: tabid = 'tab200'; break;
			case 7: tabid = 'tab300'; break;
			case 8: tabid = 'tab400'; break;
			case 9: tabid = 'tab500'; break;
			case 10: tabid = 'tab600'; break;
			case 11: tabid = 'tab700'; break;
			case 12: tabid = 'tab800'; break;
			case 13: tabid = 'tab900'; break;
			case 14: tabid = 'tabupcoming'; break;
			case 15: return false;
		}
	} else {
		switch (tabid) {
			case 'tabintro': tabs.index = 1; break;
			case 'tabstats': tabs.index = 2; break;
			case 'tabfaq': tabs.index = 3; break;
			case 'tab00': tabs.index = 4; break;
			case 'tab100': tabs.index = 5; break;
			case 'tab200': tabs.index = 6; break;
			case 'tab300': tabs.index = 7; break;
			case 'tab400': tabs.index = 8; break;
			case 'tab500': tabs.index = 9; break;
			case 'tab600': tabs.index = 10; break;
			case 'tab700': tabs.index = 11; break;
			case 'tab800': tabs.index = 12; break;
			case 'tab900': tabs.index = 13; break;
			case 'tabupcoming': tabs.index = 14; break;
		}
	}

	tabs.elem.className = 'card-content tabs-loaded ' + tabid;
	// $('ul.tabs').tabs('select_tab', tabid);
	// console.log('index after: ' + tabs.index)
	
	changePageIndicator(tabs.index);
}

function ChangePageAndKeepPosition(callingElement, targetTabID) {
	var startingElementPosition = callingElement.getBoundingClientRect().top;
	
	GoToTab(targetTabID);
	
	/*var hash = window.location.hash;
	
	if (!(~hash.indexOf("tab"))) {*/
		var afterElementPosition = callingElement.getBoundingClientRect().top;
		
		window.scrollBy(0, afterElementPosition - startingElementPosition);
	/*}*/
}

document.addEventListener('DOMContentLoaded', function() {
	/* Initialize pagination */
	tabs.elem = document.getElementById('tab-contents');
	var paginators = document.querySelectorAll('.pagination');
	for (var i = 0, len = paginators.length; i < len; i++) {
		paginators[i].classList.remove('hide');
	}
	tabs.elem.className = 'card-content tabs-loaded tabintro';
	tabs.index = 1;
	
	/* Go to position specified by any hash entered page with */
	if (hash) {
		switch(hash){
			case 'intro':
			case 'tabintro':
				GoToTab('tabintro');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'liststats':
			case 'tabstats':
				GoToTab('tabstats');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'listfaq':
			case 'tabfaq':
				GoToTab('tabfaq');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps1':
			case 'tab00':
				GoToTab('tab00');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps100':
			case 'tab100':
				GoToTab('tab100');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps200':
			case 'tab200':
				GoToTab('tab200');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps300':
			case 'tab300':
				GoToTab('tab300');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps400':
			case 'tab400':
				GoToTab('tab400');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps500':
			case 'tab500':
				GoToTab('tab500');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps600':
			case 'tab600':
				GoToTab('tab600');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps700':
			case 'tab700':
				GoToTab('tab700');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps800':
			case 'tab800':
				GoToTab('tab800');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'eps900':
			case 'tab900':
				GoToTab('tab900');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'epsupcoming':
			case 'tabupcoming':
				GoToTab('tabupcoming');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'arcconan':
				GoToTab('tab00');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'archaibara':
				GoToTab('tab100');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'arcvermouth':
				GoToTab('tab100');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'arckir':
				GoToTab('tab400');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'arcbourbonsh':
				GoToTab('tab500');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'arcbourbonak':
				GoToTab('tab700');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'arcakaifamily':
				GoToTab('tab700');
				document.getElementById(hash).scrollIntoView(true);
				break;
			case 'arcrum':
				GoToTab('tab700');
				document.getElementById(hash).scrollIntoView(true);
				break;
			default:
				window.addEventListener('load', function() {
					if (hash.indexOf("comment-") == 0) {
						document.getElementById("disqus_thread").scrollIntoView(true);
					}
					window.location.hash = hash;
				});
				break;
		}
	}
	
	/* Email updates subscription modal init */
	var elem = document.getElementById("dcel-email-subscribe-modal");
	var instance = M.Modal.init(elem, { onOpenEnd : function() {
		// $('#dcel-email-subscribe-text').focus();
		document.getElementById("dcel-email-subscribe-text").focus();
	}});

	/*$('#dcel-email-subscribe-form-modal').submit(function() {
		instance.close();
	});*/
	document.getElementById("dcel-email-subscribe-form-modal").addEventListener("submit", function() {
		instance.close();
	});
});
//]]>
