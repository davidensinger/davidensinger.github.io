---
date: 2013-04-08 10:30:00
layout: post
slug: deploying-jekyll-with-plugins-to-github-pages
title: Deploying Jekyll with Plugins to GitHub Pages
description: Steps to deploying Jekyll with plugins to GitHub Pages.
category: Development
tags: [GitHub, Jekyll]
---

In spite of my resolution to design and develop this website simply, I’ve decided to run **Jekyll** with plugins. This complicates my deployment because **GitHub Pages** runs Jekyll in `--safe` mode, which quite reasonably prevents the running of arbitrary Ruby code on the GitHub servers.

To work around this limitation, the consensus amongst developers is to create two branches: one for development (that I’ve named *source*) and the other solely for the compiled **_site**. In the former branch I’ll add additionally functionality via custom plugins, while the latter branch will serve as the *master* that GitHub uses to publish the site.

I’ve chosen to follow these [excellent deployment steps](https://github.com/rson/rson.github.com) by [Randy Morris](http://rsontech.net/), which I’ll list below with brief explanations as to what each command does.

Delete *master* branch:

    git branch -D master

Check out a new *master* branch:

    git checkout -b master

Force the *_site/* subdirectory to be project root:

    git filter-branch --subdirectory-filter _site/ -f

Checkout the *source* branch:

    git checkout source

Push all branches to origin:

    git push --all origin

Pretty simple, right? I’m glad that I’ll now be able to add categories and tags to my site, which is next on my todo list!

## Next Steps

I’d like to automate this by including these deployment commands into a build script that concatenates, minifies, and (when applicable) optimizes my assets after Jekyll compiles the site. Still working on that, though!