---
date: 2014-04-19 16:42:00
layout: post
title: Transferring the DNS from Namecheap to CloudFlare for GitHub Pages
description: Speed up your site by taking advantage of CloudFlare’s CNAME Flattening.
image: 2014-04-19-current-webpagetest-waterfall.png
categories: [Development]
tags: [CloudFlare, DNS, Namecheap]
suggested_tweet:
  url: 'http://davidensinger.com/2014/04/transferring-the-dns-from-namecheap-to-cloudflare-for-github-pages/'
  text: 'Transferring the DNS from Namecheap to CloudFlare for GitHub Pages by @DavidEnsinger'
  hashtags: ['CloudFlare', 'DNS', 'Namecheap']
  related: ['CloudFlare', 'Namecheap', 'rose_ian']
---

A couple weeks ago [@rose_ian](https://twitter.com/rose_ian) reached out to let me know that our websites, which have the identical setup, were suffering from slow initial connection times. With some legwork Ian figured out how to markedly reduce the load time for his site by hosting his DNS with [CloudFlare](https://www.cloudflare.com/). What follows are the steps I took to understand the issue and make the switch to CloudFlare. I’d like to give a big thanks to Ian for his initial efforts.

<div class="yellow-box">
  <p><strong>Hat Tip:</strong> <a href="http://ianrose.me/blog/2014/03/30/permanent-rediect-github-project-page/">Permanent Redirect GitHub Project Page to Custom Domain</a> by <a href="https://twitter.com/rose_ian">@rose_ian</a></p>
</div>

## What’s the Issue?
Within his first email, Ian included a link to [test results for davidensinger.com from Webpagetest.org](http://www.webpagetest.org/result/140329_D9_NZT/1/details/).

A quick look reveals **a three second delay** in loading the site, which manifests itself in the **Initial Connection** time, of the second request:

<img src="{{ site.url }}/assets/img/posts/2014-04-19-initial-webpagetest-waterfall.png" alt="Image of initial Webpagetest waterfall chart results for davidensinger.com" class="media-center"/>

An extended look at the first request reveals our culprit, which is a [302 redirect](http://en.wikipedia.org/wiki/HTTP_302). We can also verify this via the [Facebook Open Graph Debugger](https://developers.facebook.com/tools/debug):

<img src="{{ site.url }}/assets/img/posts/2014-04-19-initial-facebook-debugger.png" alt="Image of initial Facebook Debugger results for davidensinger.com" class="media-center"/>

## 302 Redirects
After a quick search, I found [Analyzing the GitHub Pages Waterfall Chart](http://helloanselm.com/2014/github-pages-redirect-performance/), wherein [@helloanselm](https://twitter.com/helloanselm) discovers that [GitHub Pages](https://pages.github.com/) intentionally redirects sites that are setup with DNS `A` records.

This is our exact setup since [Namecheap](http://www.namecheap.com/?aff=32887) doesn’t support the `ALIAS` record, which is suggested by [Setting up a custom domain with Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-pages). For more info see my previous post on [Setting the DNS for GitHub Pages on Namecheap](http://davidensinger.com/2013/03/setting-the-dns-for-github-pages-on-namecheap/).

That said, the `ALIAS` record doesn’t have robust support amongst registrars. I don’t have a good technical understanding of DNS, so I defer to the following post for a better explanation of the potential pitfalls of the `ALIAS` record.

<div class="yellow-box">
  <p><strong>Warning:</strong> <a href="https://iwantmyname.com/blog/2014/01/why-alias-type-records-break-the-internet.html">Why ALIAS-type DNS Records Break The Internet</a> by <a href="https://twitter.com/norbu09">@norbu09</a></p>
</div>

## CloudFlare to the Rescue
Through his research, Ian came across [a post at Higher Order Heroku](http://www.higherorderheroku.com/articles/cloudflare-dns-heroku/) that subsequently led him to CloudFlare. It seems that a common request amongst users was for an Alias-type record to use with AWS, Heroku, and GitHub Pages. In response, CloudFlare rolled out CNAME Flattening earlier this year, which they introduced with this blog post: [Introducing CNAME Flattening](http://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root).

As previously stated, I don’t understand the DNS specification as well as I’d like, but CloudFlare seems confident that their new CNAME Flattening feature won’t break the Internet. It also won’t interfere with your `MX` records, so you need not worry about receiving your emails either. Ask Ian, as I questioned him on this point several times: “Hey still no email problems?”, to which his reply was always in the affirmative.

### CloudFlare Support Article
- [CNAME Flattening: RFC-compliant support for CNAME at the root](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)

## CloudFlare DNS Settings for GitHub Pages
Okay so you’re ready to make the move to CloudFlare, right? After you sign up (you can do the free account), you’ll then want to add your site:

<img src="{{ site.url }}/assets/img/posts/2014-04-19-cloudflare-add-site.png" alt="Image of CloudFlare Add Site" class="media-center"/>

Once CloudFlare finishes importing your DNS records, you’ll then want to delete both of your `A` records and replace them with one `CNAME` that points to your **username.github.io**. Use the **@** symbol to denote your root domain:

<img src="{{ site.url }}/assets/img/posts/2014-04-19-cloudflare-cname-for-github-pages.png" alt="Image of CloudFlare CNAME settings for GitHub Pages" class="media-center"/>

You should then have the following two `CNAME` records, amongst whatever other DNS records you may have:

<img src="{{ site.url }}/assets/img/posts/2014-04-19-cloudflare-dns-settings-for-github-pages.png" alt="Image of CloudFlare DNS settings for GitHub Pages" class="media-center"/>

Once you’ve finished modifying your DNS records with CloudFlare, you’ll want to transfer your DNS away from Namecheap.

## Transfering DNS from Namecheap to CloudFlare
To transfer your DNS to CloudFlare, login to your Namecheap account, select the appropriate domain name, and then go to **Transfer DNS to Webhost**. You’ll see the following screen:

<img src="{{ site.url }}/assets/img/posts/2014-04-19-namecheap-transfer-dns.png" alt="Image of transferring DNS from Namecheap to CloudFlare" class="media-center"/>

Please note that the nameservers that I used, **gail.ns.cloudflare.com** and **hugh.ns.cloudflare.com**, may not be the nameservers that you’ll need to use with CloudFlare.

## So Did It Work?
After a few days with the new DNS settings at CloudFlare, I’m happy to report that the site loads much faster. The 302 redirect is gone, which reduces the **Initial Connection** time and subsequently the **Time to First Byte**:

<img src="{{ site.url }}/assets/img/posts/2014-04-19-current-webpagetest-waterfall.png" alt="Image of initial Webpagetest waterfall chart results for davidensinger.com" class="media-center"/>

I’m pleased with the new results, although I’m unsure how this affects the site from the perspective of GitHub Pages. I know they offer [protection against denial of service attacks](https://github.com/blog/1715-faster-more-awesome-github-pages), but I don’t know if adding CloudFlare into the mix affects this in any way. If anybody has any perspective on this, please [let me know](https://twitter.com/DavidEnsinger).

<div class="gray-box">
  <p><strong>More Info:</strong> DNSimple has a good write up about the <a href="http://support.dnsimple.com/articles/differences-between-a-cname-alias-url/">Differences between the A, CNAME, ALIAS and URL records</a>.</p>
</div>
