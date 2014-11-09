---
date: 2014-11-09 10:15:00
layout: post
title: 'How to Dynamically Include SVGs Inline with Jekyll'
description: 'A directory of icons, YAML Front Matter, a Liquid for loop, and before you know it, you’ve dynamically included your inline SVGs.'
tags: ['Jekyll', 'SVG']
suggested_tweet:
  hashtags: ['Jekyllrb', 'SVG']
---

For [Webworke.rs](http://webworke.rs/) (my website about local folks who make websites), I link to the social media accounts of the people I profile to help promote the work they do. To do this, I dynamically include an SVG icon (and link) for each of their respective social media accounts. The SVG icons are kept in the `_includes/social-icons/` directory and they’re added to the page template with some [YAML Front Matter](http://jekyllrb.com/docs/frontmatter/) and a [Liquid for loop](http://docs.shopify.com/themes/liquid-documentation/tags/iteration-tags#for).

## YAML Front Matter
Each social media account gets a title, url, and a class, which are then used by the Liquid for loop to generate the markup.

{% highlight yaml %}
social-icons:
 - title: GitHub
   url: https://github.com/davidensinger
   class: github
 - title: LinkedIn
   url: https://www.linkedin.com/in/davidensinger
   class: linkedin
 - title: Twitter
   url: https://twitter.com/davidensinger
   class: twitter
{% endhighlight %}

## Liquid For Loop
We loop through each social media account in the YAML Front Matter. An include prints out the SVG icon markup inline, which essentially results in `{% raw %}{% include social-icons/github.svg %}{% endraw %}` for each SVG icon. The respective URL and title are pulled from the loop as well.

{% highlight html %}
{% raw %}
{% for icon in social-icons %}
  <a class="social-icon--link {{ icon.class }}" href="{{ icon.url }}">
    {% include {{ icon.class | prepend: 'social-icons/' | append: '.svg' }} %}
    <span class="social-icon--title visuallyHidden">{{ icon.title }}</span>
  </a>
{% endfor %}
{% endraw %}
{% endhighlight %}

## Resulting HTML
Here’s what the resulting HTML output looks like:

{% highlight html %}
<a class="social-icon--link github" href="https://github.com/davidensinger">
  <svg class="social-icon--svg github">…</svg>
  <span class="social-icon--title visuallyHidden">GitHub</span>
</a>
<a class="social-icon--link linkedin" href="https://www.linkedin.com/in/davidensinger">
  <svg class="social-icon--svg linkedin">…</svg>
  <span class="social-icon--title visuallyHidden">LinkedIn</span>
</a>
<a class="social-icon--link twitter" href="https://twitter.com/davidensinger">
  <svg class="social-icon--svg twitter">…</svg>
  <span class="social-icon--title visuallyHidden">Twitter</span>
</a>
{% endhighlight %}

## Summary
It’s an elegant way to dynamically include the social media icons and links. Thankfully it wasn’t difficult to set up and it has proven easy to maintain. I did spend a lot of time making the dozens of social media icons, but that was all upfront work.
