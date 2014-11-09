---
date: 2013-04-17 22:16:00
layout: post
title: 'Supporting Twitter Cards with Jekyll'
description: 'How to add support for Summary Twitter Cards to Jekyll.'
tags: ['Jekyll', 'Twitter']
sitemap:
  lastmod: 2014-11-07
suggested_tweet:
  hashtags: ['Jekyll', 'jekyllrb']
  related: ['jekyllrb']
---

I just added support for [Twitter Cards](https://dev.twitter.com/cards/overview) to my website because I wanted more control over how my site displays on Twitter. There are six different card types, although the only one that’s appropriate for my site is the [Summary Card](https://dev.twitter.com/cards/types/summary), which lets users preview site content within a tweet.

## Summary Card

The Summary Card is the default and includes a title, description, thumbnail, and Twitter account attribution. The following markup is provided by the developer docs:

{% highlight html %}
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_username">
<meta name="twitter:title" content="Title">
<meta name="twitter:url" content="URL">
<meta name="twitter:description" content="Up than 200 characters.">
<meta name="twitter:creator" content="@creator_username">
<meta name="twitter:image:src" content="http://path/to/image.jpg">
{% endhighlight %}

### Card, Site, and Creator

These three meta tags and their values stay constant, regardless of page content. I use my Twitter handle for both *site* and *creator*, although I’m not sure that I need to. I figure that it can’t hurt to do so, though.

{% highlight html %}
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_username">
<meta name="twitter:creator" content="@creator_username">
{% endhighlight %}

### Title

I’ve denoted a site title in my **_config.yml** and a page title in the **YAML Front Matter** block that’s specific to every page and post on my site.

{% highlight html %}{% raw %}
{% if page.title %}
  <meta name="twitter:title" content="{{ page.title }}">
{% else %}
  <meta name="twitter:title" content="{{ site.title }}">
{% endif %}
{% endraw %}
{% endhighlight %}

### URL

I’ve also specified a *site.url* output as an absolute path in my in my **_config.yml**, as well as a *page.url* output in my **YAML Front Matter** block.

{% highlight html %}{% raw %}
{% if page.url %}
  <meta name="twitter:url" content="{{ site.url }}{{ page.url }}">
{% endif %}
{% endraw %}
{% endhighlight %}

### Description

Likewise, I have a general site description and a page specific description:

{% highlight html %}{% raw %}
{% if page.description %}
  <meta name="twitter:description" content="{{ page.description }}">
{% else %}
  <meta name="twitter:description" content="{{ site.description }}">
{% endif %}
{% endraw %}
{% endhighlight %}

A different approach to the page description is to escape and truncate the page content, which is how [Paul Stamatiou handles it](http://paulstamatiou.com/responsive-retina-blog-development-part-1):

{% highlight html %}{% raw %}
<meta name="twitter:description" content="{{ page.content | strip_html | xml_escape | truncate: 200 }}">
{% endraw %}
{% endhighlight %}

### Image

I’ve also set a default image, if there’s not an image for the current page.

{% highlight html %}{% raw %}
{% if page.image %}
  <meta name="twitter:image:src" content="{{ site.url }}/path/to/image/{{ page.image }}">
{% else %}
  <meta name="twitter:image:src" content="{{ site.url }}/path/to/image/logo.png">
{% endif %}
{% endraw %}
{% endhighlight %}

## All Together Now

Here’s what my final block of code looks like:

{% highlight html %}{% raw %}
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_username">
<meta name="twitter:creator" content="@creator_username">
{% if page.title %}
  <meta name="twitter:title" content="{{ page.title }}">
{% else %}
  <meta name="twitter:title" content="{{ site.title }}">
{% endif %}
{% if page.url %}
  <meta name="twitter:url" content="{{ site.url }}{{ page.url }}">
{% endif %}
{% if page.description %}
  <meta name="twitter:description" content="{{ page.description }}">
{% else %}
  <meta name="twitter:description" content="{{ site.description }}">
{% endif %}
{% if page.image %}
  <meta name="twitter:image:src" content="{{ site.url }}/path/to/image/{{ page.image }}">
{% else %}
  <meta name="twitter:image:src" content="{{ site.url }}/path/to/image/logo.png">
{% endif %}
{% endraw %}
{% endhighlight %}

## Validate

If you’re curious if your code validates, Twitter has provided a [validator](https://cards-dev.twitter.com/validator) so you can easily check. You’ll need to pass the validation test before you can submit a **Domain Approval Request**, which will whitelist your website for inclusion with the service. It shouldn’t take much time at all to be approved.

<div class="gray-box">
  <p><strong>More Info:</strong> David Walsh has a really great overview of <a href="http://davidwalsh.name/twitter-cards">Twitter Cards</a>, which is well worth a read.</p>
</div>
