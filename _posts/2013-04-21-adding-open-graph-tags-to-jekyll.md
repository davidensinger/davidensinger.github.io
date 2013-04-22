---
date: 2013-04-21 20:05:00
layout: post
slug: adding-open-graph-tags-to-jekyll
title: Adding Open Graph Tags to Jekyll
description: A guide to adding Open Graph meta tags to Jekyll.
tags:
- Jekyll
- Open Graph
- Facebook
---

What is the [Open Graph](http://ogp.me/) protocol? Per **Facebook**, it “enables any web page to become a rich object in a social graph.” The documentation goes on to state that “to turn your web pages into graph objects, you need to add basic metadata to your page.” Put more simply, add **Open Graph meta tags** to your website to have greater control over how your content is displayed when shared via Facebook.

## Basic Metadata

The basic metadata includes a **title**, **object type**, **image**, and **url**, as per the documentation:

{% highlight html %}
<meta content="Title" property="og:title">
<meta content="Type" property="og:type">
<meta content="Image" property="og:image">
<meta content="URL" property="og:url">
{% endhighlight %}

I’ve also included a **site name** and **description**:

{% highlight html %}
<meta content="Site Name" property="og:site_name">
<meta content="Description" property="og:description">
{% endhighlight %}

### Object Types

There are many different [object types](http://ogp.me/#types) to which you may categorize your page: music, video, article, book, profile, and website, amongst others. The two types that are relevant to my site are **article** and **website**, the latter being the object type that I’ll fall back upon for every page that isn’t a post.

#### Article

The article object type has several possible values, but I’m only using **article:published_time**, **article:author**, and **article:tag** for my site:

{% highlight html %}
<meta content="Time" property="article:published_time">
<meta content="Author" property="article:author">
<meta content="Tag" property="article:tag">
{% endhighlight %}

## Code

<div class="yellow-box">
  <p><strong>Please Note:</strong> I’ve skipped the explanations for some of the following conditional statements because they’re identical to those that I wrote about in my <a href="http://davidensinger.com/2013/04/supporting-twitter-cards-with-jekyll/">Supporting Twitter Cards with Jekyll</a> post. See that post for further information.</p>
</div>

Here’s the final snippet of code with the appropriate meta data:

{% highlight html %}{% raw %}
<meta content="{{ site.title }}" property="og:site_name">
{% if page.title %}
  <meta content="{{ page.title }}" property="og:title">
{% else %}
  <meta content="{{ site.title }}" property="og:title">
{% endif %}
{% if page.title %}
  <meta content="article" property="og:type">
{% else %}
  <meta content="website" property="og:type">
{% endif %}
{% if page.description %}
  <meta content="{{ page.description }}" property="og:description">
{% else %}
  <meta content="{{ site.description }}" property="og:description">
{% endif %}
{% if page.url %}
  <meta content="{{ site.url }}{{ page.url }}" property="og:url">
{% endif %}
{% if page.date %}
  <meta content="{{ page.date | date_to_xmlschema }}" property="article:published_time">
  <meta content="{{ site.url }}/about/" property="article:author">
{% endif %}
{% if page.image %}
  <meta content="{{ site.url }}/assets/img/posts/{{ page.image }}" property="og:image">
{% else %}
  <meta content="{{ site.url }}/assets/img/logo-high-resolution.png" property="og:image">
{% endif %}
{% if page.tags %}
  {% for tag in page.tags %}
  <meta content="{{ tag }}" property="article:tag">
  {% endfor %}
{% endif %}
{% endraw %}
{% endhighlight %}

## Validate

To verify that your code validates, see the [Facebook Debugger](https://developers.facebook.com/tools/debug).
