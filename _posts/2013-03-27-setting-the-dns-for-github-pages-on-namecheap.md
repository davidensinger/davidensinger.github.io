---
date: 2013-03-27 20:05:00
layout: post
title: Setting the DNS for GitHub Pages on Namecheap
description: How to properly set up the DNS on Namecheap for your custom domain with GitHub Pages.
image: 2013-03-27-namecheap-all-host-records.png
category: Development
tags: [DNS, GitHub, Jekyll, Namecheap]
suggested_tweet:
  url: 'http://davidensinger.com/2013/03/setting-the-dns-for-github-pages-on-namecheap/'
  text: 'Setting the DNS for GitHub Pages on Namecheap by @DavidEnsinger'
  hashtags: ['Namecheap', 'Jekyll', 'jekyllrb']
  related: ['jekyllrb', 'Namecheap']
---

After pushing my site to **GitHub** and verifying that it worked at [davidensinger.github.io](http://davidensinger.github.io/), I then went to set up my custom domain name. The [documentation](https://help.github.com/articles/setting-up-a-custom-domain-with-pages) provided by GitHub is clear on the subject, but I still managed to forget about my subdomains. For more than eight hours, anyone who attempted to visit [davidensinger.com](http://davidensinger.com/) was served with a 404, which is [rather embarrassing](https://twitter.com/DavidEnsinger/status/316642135216619522) for one who makes a living as a developer.

In the interest of helping others avoid the mistakes I made, here’s a guide to setting up the DNS for GitHub pages on [Namecheap](http://www.namecheap.com/?aff=32887), my registrar of choice.

<div class="yellow-box">
  <p><strong>Please Note:</strong> This guide assumes that you’re using a top-level domain (TLD).</p>
</div>

## Add a CNAME File to your Repo

Create a new file and put your domain name in it. Save it as CNAME.

    yourtlddomainname.com

## Find your Host Records

<img src="/assets/img/posts/2013-03-27-namecheap-all-host-records.png" alt="Image of All Host Records" class="media-right img-border" />

Log into your Namecheap account, select the appropriate domain name, and then go to **All Host Records**.

## Set up the DNS

1. Set the **@** (used to denote the domain name for which you’re configuring the DNS) **IP Address/URL** to `204.232.175.78` and the **Record Type** to `A (Address)` with a **TTL** (an acronym for **Time To Live** that refers to the capability of the DNS servers to cache DNS records) of `1800`.
2. Set the **www** (the subdomain www) **IP Address/URL** to `username.github.io` and the **Record Type** to `CNAME (Alias)` with a **TTL** of `1800`.

<img src="/assets/img/posts/2013-03-27-namecheap-dns-settings.png" alt="Image of DNS settings" class="media-center img-border" />

Save and then you’re all set! Please note, however that it may take some time for the changes to the DNS to propagate.

<div class="gray-box">
  <p><strong>More Info:</strong> Google has a pretty good <a href="http://support.google.com/a/bin/answer.py?hl=en&answer=48090">Basic Guide to DNS</a>.</p>
</div>
