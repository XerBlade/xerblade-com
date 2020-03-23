# XerBlade.com
Here lies the CSS and JS files used by XerBlade.com.

### File Descriptions

<dl>
  <dt>main.css</dt>
  <dd>Just as it sounds. It's the mains stylesheet that styles everything on the site.</dd>

  <dt>darktheme.css</dt>
  <dd>Essentially converts everything from main.css into a dark theme. A media attribute on the link tag is used to decide when it should be applied.</dd>
  
  <dt>main.js</dt>
  <dd>The main collection of scripts that initialize and run the basic elements that are on every page. Menu toggles, popups, date conversions; it's all here.</dd>
  
  <dt>darktheme.js</dt>
  <dd>Initializes a toggle button for and stores the state of the dark theme preference. For the most part, it just changes the media attribute on the darktheme.css link tag.</dd>
  
  <dt>detective-conan-important-episode-list.js</dt>
  <dd>Code unique to the Detective Conan Important Episode List page. Basically, this implements the inline pagination system.</dd>
  
  <dt>relatedposts.js</dt>
  <dd>Displays the "related posts" on blog posts. Typically lazyloaded via main.js</dd>
  
  <dt>recentposts.js</dt>
  <dd>Displays the equivalent to "related posts" on standard pages, including links to other standard pages in this case. Also typically lazyloaded via main.js</dd>
  
  <dt>advanced-analytics.js</dt>
  <dd>Initializes Google Analytics with a bunch of custom options and definitions.</dd>
</dl>

### XerBlade.com Bug Tracker
Request bug fixes, improvements, or features for https://www.xerblade.com via this bug tracker.

Go [here](../../issues/new) to file a new issue. And yes, feature requests do qualify as "issue" reports. *Content* requests, on the other hand, should *not* be filed as issues. Please leave a comment about any of those on the website. Use this to make technical reports or requests.

Before creating a new report, please check [the list of existing issues](../../issues) to see if it's already been covered.
