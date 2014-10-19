---
date: 2013-12-02 10:44:00
layout: post
title: Quick Mobile Testing Tips and Tricks
description: Tools to help with mobile debugging when the needed browser, operating system, and/or device isn’t available.
image: 2013-12-02-safari.jpg
tags: [Mobile]
suggested_tweet:
  url: 'http://davidensinger.com/2013/12/quick-mobile-testing-tips-and-tricks/'
  text: 'Quick Mobile Testing Tips and Tricks by @DavidEnsinger'
  hashtags: ['mobile']
---

Have you ever needed to track down a bug in mobile, but due to circumstances found yourself without the needed browser, operating system, and/or device? It can be really frustrating, especially when working with an ever approaching deadline. Thankfully, there are many tools available to help debug in such a situation, even if using them isn’t a proper substitute for the actual device.

<div class="red-box">
  <p><strong>Warning:</strong> For real, the following tools are definitely not a proper substitute for actual devices.</p>
</div>

## iOS Simulator
For debugging on iOS, check out the [iOS Simulator](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html), which comes packaged within [Xcode](https://developer.apple.com/xcode/). The simulator has different versions of both the **iPhone** and **iPad**, which can easily be rotated and scaled, to test in portrait and landscape orientations and fit onto your monitor, respectively.

<img src="/img/posts/2013-12-02-safari.jpg" alt="Image of the iOS Simulator" class="media-center img-border" />

To open, go to `Applications > Xcode (right click and “Show Package Contents”) > Contents > Applications > iPhone Simulator`. Once the program is opened, you can easily add it to your the Dock.

### Integration with Safari Web Inspector
The iOS Simulator also has integration with the [Safari Web Inspector](https://developer.apple.com/library/safari/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Introduction/Introduction.html), which can be accessed from `Develop > iPhone (or iPad) Simulator`.

<div class="yellow-box">
  <p><strong>More Info:</strong> Here’s a great guide to <a href="http://webdesign.tutsplus.com/tutorials/workflow-tutorials/quick-tip-using-web-inspector-to-debug-mobile-safari/">Using Web Inspector to Debug Mobile Safari</a> by <a href="https://twitter.com/jimniels">@jimniels</a>.</p>
</div>

## Opera Mobile Emulator
Opera supports mobile debugging via their [Opera Mobile Emulator](http://www.opera.com/developer/mobile-emulator), which comes ready with more than a dozen presets to mimic the “defined resolution, pixel density, user interface” of popular devices. It can be paired with [Opera Dragonfly](http://www.opera.com/dragonfly/), a suite of developer tools.

<img src="/img/posts/2013-12-02-opera.jpg" alt="Image of the Opera Mobile Emulator" class="media-center img-border" />

## Firefox
The [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools) have come a long way in the past year. Amongst the many recent additions is the [Responsive Design View](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View), a tool to easily switch between viewport widths and device orientations. For additional resolutions, see [More Display Resolutions](https://addons.mozilla.org/en-US/firefox/addon/more-display-resolutions/).

<img src="/img/posts/2013-12-02-firefox.jpg" alt="Image of the Responsive Design View within Firefox" class="media-center img-border" />

### Extensions for Firefox
These extensions may be helpful as well:

- [More Display Resolutions](https://addons.mozilla.org/en-US/firefox/addon/more-display-resolutions/): Adds additional resolutions to the Responsive Design View
- [User Agent Switcher](https://addons.mozilla.org/en-US/firefox/addon/user-agent-switcher/): Adds a menu and toolbar button to switch the browser’s user-agent string.

## Chrome
The [Chrome Developer Tools](https://developers.google.com/chrome-developer-tools/) come with a several features that are helpful when [emulating mobile](https://developers.google.com/chrome-developer-tools/docs/mobile-emulation):

- Emulate touch events (usally not present on traditional desktop devices, although this is changing)
- Emulate device viewports
- Network bandwidth throttling (simulate a slow connection)
- Device orientation overrides, amongst others

<img src="/img/posts/2013-12-02-chrome.jpg" alt="Image of the Mobile Emulation overrides within Chrome" class="media-center img-border" />

### Extensions for Chrome
These extensions may be helpful as well:

- [Resolution Test](https://chrome.google.com/webstore/detail/resolution-test/idhfcdbheobinplaamokffboaccidbal): Views for different screen resolutions, with an option to define your own resolutions
- [Responsive Inspector](https://chrome.google.com/webstore/detail/responsive-inspector/memcdolmmnmnleeiodllgpibdjlkbpim): Inspects media queries
- [User-Agent Switcher for Chrome](https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg): Spoofs and mimics user-agent strings.

That’s it. May your mobile debugging be better, especially when ill-equipped and under pressure!
