---
date: 2013-03-27 20:05:00
layout: post
slug: setting-the-dns-for-github-pages-on-namecheap
title: Setting the DNS for GitHub Pages on Namecheap
description: How to properly set up the DNS on Namecheap for your custom domain with GitHub Pages.
---

After pushing my site to **GitHub** and verifying that it worked at [davidensinger.github.com](davidensinger.github.com), I then went to set up my custom domain name. The [documentation](https://help.github.com/articles/setting-up-a-custom-domain-with-pages) provided by GitHub is clear on the subject, but I still managed to forget about my subdomains. For more than eight hours, anyone who attempted to visit [www.davidensinger.com](http://www.davidensinger.com) was served with a 404, which is [rather embarrassing](https://twitter.com/DavidEnsinger/status/316642135216619522) for one who makes a living as a developer.

In the interest of helping others avoid the mistakes I made, here’s a guide to setting up the DNS for GitHub pages on [Namecheap](http://www.namecheap.com/), my registrar of choice.

**Please note that this guide assumes that you’ll also be using a top-level domain (TLD).**

## Add a CNAME File to your Repo

Create a new file and put your domain name in it. Save it as CNAME.

    yourtlddomainname.com

## Find your Host Records

<img src="/assets/img/posts/2013-03-27-namecheap-all-host-records.png" alt="Image of All Host Records" class="media-right img-border" />

Log into your Namecheap account, select the appropriate domain name, and then go to **All Host Records**.

## Set up the DNS

1. Set the **@** (used to denote the domain name for which you’re configuring the DNS) **IP Address/URL** to `204.232.175.78` and the **Record Type** to `A (Address)` with a **TTL** (an acronym for **Time To Live** that refers to the capability of the DNS servers to cache DNS records) of `1800`.
2. Set the **www** (the subdomain www) **IP Address/URL** to `username.github.com` and the **Record Type** to `CNAME (Alias)` with a **TTL** of `1800`.

<img src="/assets/img/posts/2013-03-27-namecheap-dns-settings.png" alt="Image of DNS settings" class="img-border" />

Save and then you’re all set! Please note, however that it may take some time for the changes to the DNS to propagate.

For more information about DNS settings, Google has a pretty good [Basic Guide to DNS](http://support.google.com/a/bin/answer.py?hl=en&answer=48090).