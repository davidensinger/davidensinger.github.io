---
date: 2014-10-23 19:23:00
layout: post
title: 'Update Your @font-face Definitions to Just Use WOFF (and WOFF2)'
description: 'This is a public service announcement: You probably don’t need the other file formats.'
tags: ['Fonts']
---

I have been working to simplify this site, which means that I’ve been reevaluating decisions I made more than a year and a half ago. Many of these were based on assumptions that may no longer be valid. Since the initial build of this site, the browser support for **@font-face** file formats has changed dramatically. Previously it was a best practice to include four different file formats to get optimal browser support, but these days one file format suffices (at least so far as I’m concerned).

##My Previous Implementation
You may know this as the “[Bulletproof @font-face Syntax](http://www.paulirish.com/2009/bulletproof-font-face-implementation-syntax/).”

{% highlight css %}
@font-face {
    font-family: 'my-web-font';
    src: url('webfont.eot');
    src: url('webfont.eot?#iefix') format('embedded-opentype'),
         url('webfont.woff') format('woff'),
         url('webfont.ttf') format('truetype'),
         url('webfont.svg#webfont') format('svg');
    font-weight: normal;
    font-style: normal;
}
{% endhighlight %}

## My Current Implementation

{% highlight css %}
@font-face {
    font-family: 'my-web-font';
    src: url('webfont.woff2') format('woff2'),
         url('webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
{% endhighlight %}

The browser support for [WOFF](http://caniuse.com/#search=woff) is pretty good, so long as you’re comfortable not supporting IE8, Opera Mini, and older versions of Android. I’m more than okay with not supporting those, especially since they’ll still get a readable version of my site, which is really all that matters.

A benefit to including WOFF2 is that the file sizes are [30% smaller on average](https://gist.github.com/sergejmueller/cf6b4f2133bcb3e2f64a), although as of today the only browser that supports the format is Chrome. That said, I bet if I forget about this for another year that will change :)
