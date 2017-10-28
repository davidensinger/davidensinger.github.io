---
date: 2016-03-20 19:23:00
layout: post
title: 'Authenticate your Google Apps’ Gmail with DKIM and Namecheap DNS'
description: 'Also known as adding a TXT record and then praying to the gods of DNS propagation.'
image: 2016-03-20-gmail-email-without-authentication-via-dkim.png
sitemap:
  lastmod: 2016-05-18
suggested_tweet:
  hashtags: ['Namecheap', 'DNS', 'Gmail']
  related: ['Namecheap']
tags: ['DNS', 'Gmail', 'Namecheap']
---

In February [Gmail began displaying a warning icon](https://gmail.googleblog.com/2016/02/making-email-safer-for-you-posted-by.html), instead of the usual contact photo, to denote an email sent from an unauthenticated domain. This change affected several of my domains, all of which use Google Apps for their email. The recommended fix is to add [DKIM](http://www.dkim.org/) authentication to my emails, which required the addition of a TXT record to my DNS.

<div class="yellow-box">
  <p><strong>Please Note:</strong> Google recently <a href="http://googleappsupdates.blogspot.com/2016/05/getting-rid-of-spoofers-digitally-sign.html">upgraded their DKIM keys to be 2048-bit</a>.</p>
  <p>Unfortunately Namecheap doesn’t yet support the longer key length, although they say that they’re working on it. In response Google Apps now allows for the <a href="http://superuser.com/questions/1065788/using-a-410-character-dkim-txt-record-on-namecheap#answer-1077633">shorter 1024 key bit length</a>, which I was (and am) using before the upgrade.</p>
  <p>I look forward to upgrading my DKIM key to be 2048-bit and will update this post after Namecheap supports it.</p>
  <p>Also a big thanks to the folks who brought this to my attention via Twitter: <a href="https://twitter.com/jmbase">@jmbase</a>, <a href="https://twitter.com/amanjeev">@amanjeev</a>, and <a href="https://twitter.com/mattdebouge">@mattdebouge</a>.</p>
</div>

Here are the steps I took to make this happen with my favorite domain registrar, [Namecheap](https://namecheap.pxf.io/c/477139/386170/5618). If your DNS is elsewhere, fear not, as these steps apply to other registrars (and DNS hosts) too.

<div class="yellow-box">
  <p><strong>Please Note:</strong> You may also want to consult this post, <a href="https://support.google.com/a/answer/174124">Authenticate email with DKIM</a>, while you set this up.</p>
</div>

## Unauthenticated Email
This is an example of what I was unknowingly sending folks:

<img src="/img/srcset/2016-03-20-gmail-email-without-authentication-via-dkim.png" alt="An unauthenticated email" class="media-full srcset-full" />

## The Google Apps Gmail Admin Area
The first step is to login as the administrator to your Google Apps account. I seldom change any of the settings, so I always feel a little lost trying to find the right page. Here’s the path, current as of the publishing of this post:

{% highlight html %}
Admin (or Admin console > Apps > Google Apps > Gmail > Authenticate email
{% endhighlight %}

Here is an edited (for clarity, I hope) photo that shows you the general area of the settings that you want:

<img src="/img/srcset/2016-03-20-google-apps-settings-for-gmail.jpg" alt="The admin area of Gmail for Google Apps" class="media-full srcset-full" />

### Generate the Domain Key
Some things to note here:

1. Select the desired domain
2. Generate a new record and optionally edit the DKIM selector prefix. I kept mine as “google” because I don’t have very many records in my DNS.
3. Please note that there will be a very long alphanumeric string, although I’ve edited my screenshot to just read “VERYLONGSTRING”
4. Also ignore the fact that this screenshot confirms that the authentication works. I should have taken an inital screenshot, but neglected to do so. Once I had it working I didn’t want to turn it off.

<img src="/img/srcset/2016-03-20-google-apps-settings-authenticate-email-success.png" alt="Successful authentication of the TXT record" class="media-full srcset-full" />

## The Namecheap Dashboard
Now that you’ve got the two required values, you’ll want to log into [Namecheap](https://namecheap.pxf.io/c/477139/386170/5618) to navigate to the “Advanced DNS” for your domain:

<img src="/img/srcset/2016-03-20-namecheap-dashboard-advanced-dns.png" alt="How to navigate to the Advanced DNS" class="media-full srcset-full" />

### Adding a TXT Record
Once there, click the “Add New Record” button and select “TXT Record” from the dropdown menu. Paste the appropriate values into the “Host” and “Value” fields and then save them with the green “&#10003;” icon.

<img src="/img/srcset/2016-03-20-advanced-dns-txt-record-values.png" alt="Add the TXT record to the Advanced DNS" class="media-full srcset-full" />

## Successful Authentication
Once the DNS propagates, you’ll see the green “Authenticating email &#10003;” (see my above screenshot) and you’ll be good to go, err authenticate!

<img src="/img/srcset/2016-03-20-gmail-authenticated-email-with-dkim.png" alt="An authenticated email with DKIM" class="media-full srcset-full" />
