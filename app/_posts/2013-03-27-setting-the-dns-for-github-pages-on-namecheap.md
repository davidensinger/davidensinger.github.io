---
date: 2013-03-27 20:05:00
layout: post
title: 'Setting the DNS for GitHub Pages on Namecheap'
description: 'How to properly set up the DNS on Namecheap for your custom domain with GitHub Pages.'
image: 2016-01-15-namecheap-github-pages-dns-settings.png
tags: ['DNS', 'GitHub', 'Jekyll', 'Namecheap']
sitemap:
  lastmod: 2016-03-20
suggested_tweet:
  hashtags: ['Namecheap', 'Jekyll', 'jekyllrb']
  related: ['jekyllrb', 'Namecheap']
---

After pushing my site to **GitHub** and verifying that it worked at [davidensinger.github.io](http://davidensinger.github.io/), I then went to set up my custom domain name. The [documentation](https://help.github.com/articles/setting-up-a-custom-domain-with-pages) provided by GitHub is clear on the subject, but I still managed to forget about my subdomains. For more than eight hours, anyone who attempted to visit [davidensinger.com](http://davidensinger.com/) was served with a 404, which is [rather embarrassing](https://twitter.com/DavidEnsinger/status/316642135216619522) for one who makes a living as a developer.

In the interest of helping others avoid the mistakes I made, here’s a guide to setting up the DNS for GitHub pages on [Namecheap](http://www.namecheap.com/?aff=32887), my registrar of choice.

<div class="yellow-box">
  <p><strong>Please Note:</strong> I no longer use Namecheap to host the DNS for this site. See my new setup at <a href="http://davidensinger.com/2014/04/transferring-the-dns-from-namecheap-to-cloudflare-for-github-pages/">Transferring the DNS from Namecheap to CloudFlare for GitHub Pages</a>.</p>
  <p>This guide was most recently updated with new settings to support <a href="https://github.com/blog/1715-faster-more-awesome-github-pages">Faster, More Awesome GitHub Pages</a>.</p>
  <p>Namecheap DNS doesn’t support an <strong>ALIAS</strong> record for the APEX domain, so you’ll need to use two <strong>A</strong> records for our DNS, per the instructions in the <a href="https://help.github.com/articles/using-a-custom-domain-with-github-pages/">Using a custom domain with GitHub Pages</a>. This will not allow you to use the content delivery network, but will still help protect your site against denial of service attacks.</p>
</div>

## Add a CNAME File to your Repo

Create a new file and put your domain name in it. Save it as CNAME and commit it to your GitHub repo.

{% highlight txt %}
yourtldomainname.com
{% endhighlight %}

## Find your Host Records
Log into your Namecheap account and navigate yourself over to your **Domain List**, which you can find in your **Dashboard**. Find the desired domain name from your **Domain List**, and then hover over the small house icon to reveal the **Advanced DNS** option. Click it!

<img src="/img/srcset/2016-01-15-namecheap-domain-list-advanced-dns.png" alt="Namecheap Advanced DNS" class="media-center media-border media-full srcset-full" />

Alternatively, you could also click the **Manage** button and then navigate to the **Advanced DNS** tab.

## Set up the DNS
You’ll need to set up three different records:

1. Click the **Add New Record** button and then select `A Record` from the list. You’ll then want to enter `@` for **Host** and `192.30.252.153` for **IP Address**. Leave the **TTL** as `Automatic` (use this setting for all three records).
2. Add another new `A Record` with the same `@` for the **Host**, but use `192.30.252.154` for the **IP Address**.
3. Finally, add another new record, but select `CNAME Record`. For **Host** set `www` and for the **IP Address** use your `username.github.io.` (with trailing period).

<img src="/img/srcset/2016-01-15-namecheap-github-pages-dns-settings.png" alt="GitHub Pages DNS settings at Namecheap" class="media-center media-border media-full srcset-full" />

Save and then you’re all set! Please note, however that it may take some time for the changes to the DNS to propagate.

<div class="gray-box">
  <p><strong>More Info:</strong> Google has a pretty good <a href="http://support.google.com/a/bin/answer.py?hl=en&answer=48090">Basic Guide to DNS</a>.</p>
</div>
