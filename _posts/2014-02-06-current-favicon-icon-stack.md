---
date: 2014-02-06 15:00:00
layout: post
title: Current Favicon Icon Stack
description: My current favicon icon stack with recommended tools and resources too.
categories: [Development]
tags: [Favicon]
suggested_tweet:
  url: 'http://davidensinger.com/2014/02/current-favicon-icon-stack/'
  text: 'My Current Favicon Icon Stack by @DavidEnsinger'
  hashtags: ['favicon']
---

Whether it’s the file format, dimensions, or browser support (amongst other concerns), it’s confusing to figure out the best icon stack for one’s website. What follows is my current preferred markup, with some recommended tools and resources.

<div class="yellow-box">
  <p><strong>Please Note:</strong> This is not an exhaustive list and surely I don’t cover all possible browsers and devices. Hopefully I get the majority, though :)</p>
</div>

## Favicon
For the favicon, I use [Icon Slate](http://www.kodlian.com/apps/icon-slate) to combine a 32x32px PNG with a 16x16px PNG to form the ICO, which gives me support for HiDPI devices. For optimal browser support I drop the resulting ICO into the site root with the following markup:

{% highlight html %}
{% raw %}
<link rel="shortcut icon" href="/favicon.ico" >
{% endraw %}
{% endhighlight %}

## iOS
There are [half a dozen icon dimensions](https://developer.apple.com/library/ios/documentation/userexperience/conceptual/MobileHIG/IconMatrix.html) required to support all the different iOS devices. Previously you needed to follow Apple’s naming conventions for the filenames, but these days the following markup works:

{% highlight html %}
{% raw %}
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicon-152x152.png">
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon-144x144.png">
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicon-120x120.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon-114x114.png">
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicon-76x76.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon-72x72.png">
<link rel="apple-touch-icon-precomposed" href="/favicon-57x57.png">
{% endraw %}
{% endhighlight %}

## Android
Seemingly older versions of Android will fallback to use the `apple-touch-icon-precomposed` icons. [Newer versions of Chrome on Android](https://developers.google.com/chrome/mobile/docs/installtohomescreen) will use the “largest icon found in one of the following `<link>` tags”:

{% highlight html %}
{% raw %}
<link rel="shortcut icon" sizes="196x196" href="/favicon-196x196.png">
{% endraw %}
{% endhighlight %}

## IE
For [Internet Explorer](http://msdn.microsoft.com/en-us/library/ie/dn255024%28v=vs.85%29.aspx), I followed the Windows 8 Tiles section of [Designing Device Assets: Templates and Tips](http://viget.com/inspire/designing-device-assets-templates-techniques-and-tips) and came up with the following:

{% highlight html %}
{% raw %}
<meta name="msapplication-TileColor" content="#FFFFFF">
<meta name="msapplication-TileImage" content="/favicon-144x144-ie10.png">

<meta name="msapplication-square70x70logo" content="/favicon-128x128-ie11.png"/>
<meta name="msapplication-square150x150logo" content="/favicon-270x270-ie11.png"/>
<meta name="msapplication-wide310x150logo" content="/favicon-558x270-ie11.png"/>
<meta name="msapplication-square310x310logo" content="/favicon-558x558-ie11.png"/>
{% endraw %}
{% endhighlight %}

The former two lines of markup are for IE10, while the latter four are for IE11. See the aforementioned blog post for very helpful PSD templates.

That’s it! If any of this is incorrect, I’d like to know. Send me [a tweet about it](https://twitter.com/davidensinger)!
