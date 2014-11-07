---
date: 2013-09-16 16:50:00
layout: post
title: 'Suggested Tweet Plugin for Jekyll'
description: 'A Liquid tag for Jekyll that allows for the embedding of suggested tweets via Twitter’s Web Intents API.'
tags: ['Jekyll', 'Liquid', 'Twitter']
suggested_tweet:
  hashtags: ['Jekyll', 'jekyllrb', 'Twitter']
  related: ['jekyllrb', '2john4tv', 'richhollis']
---

It’s always a really nice feeling when one sees one’s posts shared with others, usually via blog post or Tweet. In the spirit of encouraging more of this, I present to you the [Suggested Tweet](https://github.com/davidensinger/jekyll-suggested-tweet) plugin for [Jekyll](http://jekyllrb.com/). With this plugin, visitors to your site need no longer grope for words while they attempt to share your content!

## About the Plugin
The **Suggested Tweet** plugin is a custom [Liquid Tag](http://wiki.shopify.com/Liquid) for **Jekyll** that allows for the embedding of suggested tweets via [Twitter’s Web Intents API](https://dev.twitter.com/docs/intents). It makes liberal use of [Rich Hollis’s](http://richhollis.co.uk/) [Twitter Web Intents Ruby Gem](https://github.com/richhollis/twitter_web_intents) and was lovingly made by [John Colvin](http://2john4tv.biz/) and me.

## Installation
1. Copy **suggested-tweet.rb** into your site’s **_plugins** directory
2. Install **twitter_web_intents gem**, either manually or via **Bundler**
3. Add desired parameters to **_config.yml**
4. Add desired parameters to **YAML front-matter** of page
5. Add {% raw %}`{% suggested_tweet %}`{% endraw %} tag to your post or template.

## Configuration
The following parameters may be set globally in **_config.yml** or on a per page basis in the **YAML front-matter**. Parameters set in the **YAML front-matter** take precedence over those set in **_config.yml**. Note that all parameters are optional, although be sure to set at least one!

{% highlight yaml %}
suggested_tweet:
  url:                  'http://davidensinger.com/'
  via:                  'davidensinger'
  text:                 'Hello world'
  in_reply_to:          331434728957833218
  hashtags:             ['Jekyll', 'Twitter']
  related:              ['davidensinger', 'richhollis', '2john4tv']
{% endhighlight %}

## Usage
Put the custom Liquid tag anywhere you want, whether that be within a post, layout, or include:

{% raw %}`{% suggested_tweet %}`{% endraw %}

## Output
The tag renders as a properly encoded URL:

`https://twitter.com/intent/tweet?hashtags=Jekyll,Twitter&in_reply_to=331434728957833218&related=davidensinger,richhollis,2john4tv&text=Hello+world&url=http%3A%2F%2Fdavidensinger.com&via=davidensinger`

## Liquid Output for Parameters
Any (and all) of the parameters may be used together with the **Suggested Tweet** tag. These may be helpful if decide to include the tag outside of a post and in a template:

- **_config.yml:** {% raw %}`{{ site.suggested_tweet.text }}`{% endraw %}
- **YAML front matter:** {% raw %}`{{ page.suggested_tweet.text }}`{% endraw %}

## A Practical Example
The following block of code can be found in the footer of my [posts template](https://github.com/davidensinger/davidensinger.github.io/blob/source/_layouts/post.html). You’ll see that I only print out the **text** and **hashtags** parameters, even though all six variables are available to me. This is due to parameters not displaying to my liking (**url** and **via**) or not displaying at all (**in_reply_to** and **related**) and for styling purposes as well.

{% highlight html %}{% raw %}
{% if page.suggested_tweet %}
  <div class="entry-meta-suggested-tweet">
    <h3 class="suggested-tweet-title">Spread the Word</h3>
    <a href="{% suggested_tweet %}" class="suggested-tweet-bubble">
      {% if page.suggested_tweet.text != empty %}
        <span class="suggested-tweet-text">{{ page.suggested_tweet.text }}</span>
      {% endif %}
      {% if page.suggested_tweet.hashtags != empty %}
        {% for hashtag in page.suggested_tweet.hashtags %}
          <span class="suggested-tweet-hashtag">#{{ hashtag }}</span>
        {% endfor %}
      {% endif %}
    </a>
    <p class="suggested-tweet-link"><a href="{% suggested_tweet %}" class="icon-left icon-twitter">Click to Tweet</a> <small>(you may edit before posting.)</small></p>
  </div>
{% endif %}{% endraw %}
{% endhighlight %}

## Roadmap
* Add an option to allow for parameters to be combined if 1) they’ve been set in both **_config.yml** and **YAML front-matter** of a page and 2) they accept multiple values, such as hashtags and related
* Allow for parameters to be set within the tag itself, but without using a regular expression to do so. Possible? Yay or nay?
