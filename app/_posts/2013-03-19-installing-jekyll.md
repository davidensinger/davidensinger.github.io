---
date: 2013-03-19 22:55:00
layout: post
title: 'Installing Jekyll'
description: 'How to install Jekyll on OS X.'
tags: ['Jekyll', 'RVM', 'Ruby']
suggested_tweet:
  hashtags: ['Jekyll', 'jekyllrb', 'RVM', 'Ruby']
  related: ['jekyllrb']
---

After much deliberation, I decided to simplify my blogging workflow. To that end I made the switch from __WordPress to Jekyll__, which is ”a simple, blog aware, static site generator.” Although Jekyll is easy to maintain, it can be confusing to set up. Thankfully, there is a wealth of documentation available from developers who have also made the switch. With that in mind, I’d like to contribute my experience with installing __Jekyll on OS X__.

<div class="yellow-box">
  <p><strong>Please Note:</strong> This post has been updated on March 21st, 2014, but it is still more than a year old, so it may be inaccurate in parts. Proceed with caution.</p>
</div>

## Getting Started

The consensus on the internet is to first install [Xcode](http://developer.apple.com/xcode/), which is available from the [App Store](http://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12). It will take a bit of time to download and install.

Once you’ve installed Xcode, the next step is to install [Command Line Tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/), which is available via the command line (naturally). Open up __Terminal__ (or [iTerm2](http://www.iterm2.com/#/section/home)) and enter the following:

    xcode-select --install

After installing the Command Line Tools, install [Homebrew](http://brew.sh/), which is the missing package manager for OS X:

    ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

The next step is to install [RVM](https://rvm.io) to help manage different versions of Ruby (although you won’t necessarily need to switch between versions):

    \curl -sSL https://get.rvm.io | bash -s stable

I had some difficulty installing Ruby from RVM, due to some missing dependencies. To fix this I had to find the missing packages:

    rvm requirements

Which then necessitated running the following:

    brew doctor

That led to [a fix for a warning about my paths](http://stackoverflow.com/questions/10343834/homebrew-wants-me-to-amend-my-path-no-clue-how).

After sorting that out, I was then able to install the list of missing dependencies:

    brew install (and then the list of missing packages)

And then I was able to install Ruby 2.1.1:

    rvm install 2.1.1

Which finally allowed me [to install Jekyll](http://jekyllrb.com/docs/installation/):

    gem install jekyll

## Whew!
That wasn’t so bad, was it? It feels good to work through the install with the satisfaction of knowing that you did it without any help, save for the goodwill efforts of fellow developers and their documentation. High fives to that!
