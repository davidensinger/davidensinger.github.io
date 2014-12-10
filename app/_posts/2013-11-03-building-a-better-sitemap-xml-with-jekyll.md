---
date: 2013-11-03 16:50:00
layout: post
title: 'Building a Better Sitemap.xml with Jekyll'
description: 'How to make a more flexible Sitemap.xml with Jekyll.'
tags: ['Jekyll', 'Sitemap', 'XML']
sitemap:
  lastmod: 2014-01-23
suggested_tweet:
  hashtags: ['Jekyll', 'jekyllrb', 'Sitemap']
  related: ['jekyllrb']
---

In the past several months I’ve made many incremental improvements to this website, including how I generate my [Sitemap.xml](http://davidensinger.com/sitemap.xml). While my revisions are certainly not jaw dropping, they have definitely improved the quality of my sitemap and are thus worth writing about, if only to provide a reference point to other developers. To that end, here’s a note about the changes I’ve made in my current implementation.

## Previous Configuration
In an earlier post, [Generating a Sitemap in Jekyll without a Plugin](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/), I went over the configuration of my previous sitemap, which looked like this:

{% highlight xml %}
{% raw %}
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for post in site.posts %}
    <url>
      <loc>{{ site.url }}{{ post.url }}</loc>
      {% if post.lastmod == null %}
        <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
      {% else %}
        <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
      {% endif %}
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
  {% endfor %}
  {% for page in site.pages %}
    {% if page.sitemap != null and page.sitemap != empty %}
      <url>
        <loc>{{ site.url }}{{ page.url }}</loc>
        <lastmod>{{ page.sitemap.lastmod | date_to_xmlschema }}</lastmod>
        <changefreq>{{ page.sitemap.changefreq }}</changefreq>
        <priority>{{ page.sitemap.priority }}</priority>
       </url>
    {% endif %}
  {% endfor %}
</urlset>
{% endraw %}
{% endhighlight %}

## Current Configuration
For my current implementation, I made the following changes:

- The `urlset` is much more terse as I stripped away all the attributes, save for **xmlns**
- All posts and pages are added to the sitemap, unless they’ve been explicitly set to be unpublished and excluded, respectively
- The `changefreq` and `priority` elements for pages and posts may be omitted, as those elements now have fallback values.

{% highlight xml %}
{% raw %}
---
layout: null
sitemap:
  exclude: 'yes'
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for post in site.posts %}
    {% unless post.published == false %}
    <url>
      <loc>{{ site.url }}{{ post.url }}</loc>
      {% if post.sitemap.lastmod %}
        <lastmod>{{ post.sitemap.lastmod | date: "%Y-%m-%d" }}</lastmod>
      {% elsif post.date %}
        <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
      {% else %}
        <lastmod>{{ site.time | date_to_xmlschema }}</lastmod>
      {% endif %}
      {% if post.sitemap.changefreq %}
        <changefreq>{{ post.sitemap.changefreq }}</changefreq>
      {% else %}
        <changefreq>monthly</changefreq>
      {% endif %}
      {% if post.sitemap.priority %}
        <priority>{{ post.sitemap.priority }}</priority>
      {% else %}
        <priority>0.5</priority>
      {% endif %}
    </url>
    {% endunless %}
  {% endfor %}
  {% for page in site.pages %}
    {% unless page.sitemap.exclude == "yes" %}
    <url>
      <loc>{{ site.url }}{{ page.url | remove: "index.html" }}</loc>
      {% if page.sitemap.lastmod %}
        <lastmod>{{ page.sitemap.lastmod | date: "%Y-%m-%d" }}</lastmod>
      {% elsif page.date %}
        <lastmod>{{ page.date | date_to_xmlschema }}</lastmod>
      {% else %}
        <lastmod>{{ site.time | date_to_xmlschema }}</lastmod>
      {% endif %}
      {% if page.sitemap.changefreq %}
        <changefreq>{{ page.sitemap.changefreq }}</changefreq>
      {% else %}
        <changefreq>monthly</changefreq>
      {% endif %}
      {% if page.sitemap.priority %}
        <priority>{{ page.sitemap.priority }}</priority>
      {% else %}
        <priority>0.3</priority>
      {% endif %}
    </url>
    {% endunless %}
  {% endfor %}
</urlset>
{% endraw %}
{% endhighlight %}

## Front Matter
I can now add the following variables, all of which are optional, to the front matter of my posts and pages:

{% highlight yaml %}
sitemap:
  lastmod: 2014-01-23
  priority: 0.7
  changefreq: 'monthly'
  exclude: 'yes'
{% endhighlight %}

As you can see, the changes I made are simple, but put together they make for a much more flexible implementation.

<div class="gray-box">
  <p><strong>More Info:</strong> Visit the official <a href="http://www.sitemaps.org/">sitemaps.org</a> to learn more about the protocol.</p>
</div>
