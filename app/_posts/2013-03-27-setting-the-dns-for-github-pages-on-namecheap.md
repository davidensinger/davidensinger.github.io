---
date: 2013-03-27 20:05:00
layout: post
title: 'Setting the DNS for GitHub Pages on Namecheap'
description: 'How to properly set up the DNS on Namecheap for your custom domain with GitHub Pages.'
image: 2014-01-07-namecheap-dns-settings.png
tags: ['DNS', 'GitHub', 'Jekyll', 'Namecheap']
sitemap:
  lastmod: 2014-11-07
suggested_tweet:
  hashtags: ['Namecheap', 'Jekyll', 'jekyllrb']
  related: ['jekyllrb', 'Namecheap']
---

After pushing my site to **GitHub** and verifying that it worked at [davidensinger.github.io](http://davidensinger.github.io/), I then went to set up my custom domain name. The [documentation](https://help.github.com/articles/setting-up-a-custom-domain-with-pages) provided by GitHub is clear on the subject, but I still managed to forget about my subdomains. For more than eight hours, anyone who attempted to visit [davidensinger.com](http://davidensinger.com/) was served with a 404, which is [rather embarrassing](https://twitter.com/DavidEnsinger/status/316642135216619522) for one who makes a living as a developer.

In the interest of helping others avoid the mistakes I made, here’s a guide to setting up the DNS for GitHub pages on [Namecheap](http://www.namecheap.com/?aff=32887), my registrar of choice.

<div class="yellow-box">
  <p><strong>Please Note:</strong> I no longer use Namecheap to host the DNS for this site. See my new setup at <a href="http://davidensinger.com/2014/04/transferring-the-dns-from-namecheap-to-cloudflare-for-github-pages/">Transferring the DNS from Namecheap to CloudFlare for GitHub Pages</a>.</p>
  <p>This guide was updated on January 7th, 2014 with new settings to support <a href="https://github.com/blog/1715-faster-more-awesome-github-pages">Faster, More Awesome GitHub Pages</a>.</p>
  <p>Namecheap DNS doesn’t support an <strong>ALIAS</strong> record for the APEX domain, so you’ll need to use two <strong>A</strong> records for our DNS, per the instructions in the <a href="https://help.github.com/articles/setting-up-a-custom-domain-with-pages">Setting up a custom domain with Pages</a>. This will not allow you to use the content delivery network, but will still help protect your site against denial of service attacks.</p>
</div>

## Add a CNAME File to your Repo

Create a new file and put your domain name in it. Save it as CNAME.

    yourtlddomainname.com

## Find your Host Records

<img src="/img/posts/2013-03-27-namecheap-all-host-records.png" alt="Image of All Host Records" class="media-right img-border" />

Log into your Namecheap account, select the appropriate domain name, and then go to **All Host Records**.

## Set up the DNS

1. Set the **@** (used to denote the domain name for which you’re configuring the DNS) **IP Address/URL** to `192.30.252.153` and the **Record Type** to `A (Address)` with a **TTL** (an acronym for **Time To Live** that refers to the capability of the DNS servers to cache DNS records) of `1800`.
2. Set the **www** (the subdomain www) **IP Address/URL** to `username.github.io.` (with trailing period) and the **Record Type** to `CNAME (Alias)` with a **TTL** of `1800`.
3. In **SUB-DOMAIN SETTINGS**, add an `@` in the first field, and duplicate the settings in Step 1, save for the **IP Address/URL**, which should be `192.30.252.154`.

<img src="/img/posts/2014-01-07-namecheap-dns-settings.png" alt="Image of DNS settings" class="media-center img-border" />

Save and then you’re all set! Please note, however that it may take some time for the changes to the DNS to propagate.

<div class="gray-box">
  <p><strong>More Info:</strong> Google has a pretty good <a href="http://support.google.com/a/bin/answer.py?hl=en&answer=48090">Basic Guide to DNS</a>.</p>
</div>
