---
date: 2013-05-03 10:49:00
layout: post
title: 'Setting Up Google Author Rich Snippets'
description: 'Steps for setting up Google Author Rich Snippets on your site.'
tags: ['Google', 'Rich Snippets', 'SEO']
sitemap:
  lastmod: 2014-11-07
suggested_tweet:
  hashtags: ['GooglePlus', 'SEO']
---

It turns out that it’s rather easy to display your photo alongside your content in Google’s search results. All you need to do is add support for [Rich Snippets](https://support.google.com/webmasters/bin/answer.py?hl=en&answer=99170) to your website, in particular those for authorship. This results in the addition of some minor markup to your HTML, which will then interface with your [Google+](http://plus.google.com/) account.

<div class="yellow-box">
  <p><strong>Please Note:</strong> Google has stopped displaying an authorship photo next to search results, so the following information doesn’t have the utility it once did. That said, I have kept my authorship for this site because it doesn’t seem to hurt anything.</p>
</div>

## Advantages

When you prove ownership of your content with Google, you’ll reap the following benefits:

- A listing with an image is more visible, which should result in greater click-through rate
- You’ll further your personal branding as your image is displayed in more places
- The search result displays the number of people in your circles, which will help those with a large number of followers.

## First Steps

As per Google, the first step is to have a Google+ profile:

> If you want your authorship information to appear in search results for the content you create, you'll need a Google+ Profile with a good, recognizable headshot as your profile photo. Then, verify authorship of your content by associating it with your profile.
>
> <cite>[Google Support](https://support.google.com/webmasters/bin/answer.py?hl=en&answer=1408986)</cite>

## Prove Ownership

There are several ways to prove ownership of your site to Google. You can verify your email address, add a link to your Google+ profile, and also include a link tag to your Google+ profile in the head of your site.

### Use your Email Address

You can link your email address to your Google+ profile, so long as the domain name matches. You’ll need to ensure that your posts have a byline with your name for this to work too.

### Link to your Google+ Profile

Create a link to your Google+ profile from your webpage:

{% highlight html %}
<a href="[profile_url]?rel=author">Google</a>
{% endhighlight %}

Replace **[profile_url]** with the your Google+ profile URL:

{% highlight html %}
<a href="https://plus.google.com/111951762509840042073?rel=author">Google</a>
{% endhighlight %}

Please note that the preceeding link goes to my profile. Be sure to change it to your profile! Also be sure that your link contains the <code>?rel=author</code> parameter. If it's missing, Google won't be able to associate your content with your Google+ profile.

Add a reciprocal link back from your Google+ profile to your site:

<img src="/img/srcset/2013-05-03-google-author-contributor-to.png" alt="Contributor To settings for Google+" class="media-center media-border media-full srcset-full" />

1. Edit the [Contributor To](http://plus.google.com/me/about/edit/co) section.
2. In the dialog that appears, click **Add custom link**, and then enter the website URL.
3. If you want, click the drop-down list to specify who can see the link.
4. Click **Save**.

### Add a Link to your Head

Add a link tag to your Google+ profile from your document head:

{% highlight html %}
<link href="[profile_url]" rel="author"/>
{% endhighlight %}

Replace **[profile_url]** with the your Google+ profile URL:

{% highlight html %}
<link href="https://plus.google.com/111951762509840042073/" rel="author"/>
{% endhighlight %}

Again, please note that the preceeding link goes to my profile. Change it to your profile!

## Test to Confirm

Use the [Structured Data Testing Tool](https://www.google.com/webmasters/tools/richsnippets) to verify that Google has associated your content with your Google+ profile.
