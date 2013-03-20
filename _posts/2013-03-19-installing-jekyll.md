---
date: 2013-03-19 22:55:00
layout: post
slug: installing-jekyll
title: Installing Jekyll
description: How to install Jekyll on OS X Mountain Lion 10.8.3
---

{% excerpt %}
After much deliberation, I decided to simplify my blogging workflow. To that end I made the switch from __WordPress to Jekyll__, which is ”a simple, blog aware, static site generator.” Although Jekyll is easy to maintain, it can be confusing to set up, especially for one with a dearth of experience with Ruby.
{% endexcerpt %}

Thankfully, there is a wealth of documentation available from developers who have also made the switch. With that in mind, I’d like to contribute my experience with installing __Jekyll on OS X Mountain Lion 10.8.3__.

## Getting Started

The consensus on the internet is to first install [Xcode](http://developer.apple.com/xcode/), which I had (thankfully) already installed (all 1.65 GB of it). Xcode is readily available from the [App Store](http://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12), although it does take a bit of time to download and install.

Once you’ve installed Xcode, the next step is to download __Command Line Tools__, which is available through the __Download__ tab of the the __Xcode Preferences__. It is through the command line that you'll be installing Jekyll.

After installing the Command Line Tools, open up __Terminal__ (or the console of your choice) and install [Homebrew](http://mxcl.github.com/homebrew/), which will make downloading and installing Unix software packages on OS X much easier than without.

    ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

The next step is to install [RVM](https://rvm.io), which is an acronym for __Ruby Version Manager__. With this you’ll be able to better manage different versions and implementations of Ruby on your computer.

    \curl -#L https://get.rvm.io | bash -s stable --ruby

I had some difficulty installing Ruby from RVM, which was due to missing dependencies. To remedy this I had to find the missing packages:

    rvm requirements

Which then necessitated running the following:

    brew doctor

That led to [a fix for a warning about my paths](http://stackoverflow.com/questions/10343834/homebrew-wants-me-to-amend-my-path-no-clue-how).

After sorting that out, I was then able to install the list of missing dependencies:

    brew install (and then the list of missing packages)

And then I was able to install Ruby 2.0.0:

    rvm install 2.0.0

Which finally allowed me [to install Jekyll](https://github.com/mojombo/jekyll/wiki/Install):

    gem install jekyll

## Whew!
That wasn’t so bad, was it? It feels good to work through the install with the satisfaction of knowing that you did it without any help, save for the goodwill efforts of fellow developers and their documentation. High fives to that!