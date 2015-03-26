---
date: 2015-01-10 14:23:00
layout: post
title: 'Performant Websites with Jekyll, Grunt, GitHub Pages, and CloudFlare'
description: 'Or how having the right tools for the job lends itself to building fast sites.'
tags: ['Jekyll', 'Grunt', 'Webperf']
image: 2015-01-15-google-pagespeed-insights-mobile.png
suggested_tweet:
  hashtags: ['webperf', 'Jekyllrb', 'GruntJS']
  related: ['jekyllrb']
---

Over the past year I’ve been slowly improving the performance of this website and [Webworke.rs](http://webworke.rs).

I’ve put a lot of work into my sites, but many of the performance improvements couldn’t have been made so easily without the great ecosystem of open source software and free services available to me. To say that I’m thankful for this is a gross understatement.

Both of my sites are built with a combination of [Jekyll](http://jekyllrb.com/) and [Grunt](http://gruntjs.com/). They’re hosted on [GitHub Pages](https://pages.github.com/) and their DNS is served by [CloudFlare](https://www.cloudflare.com/). I wholeheartedly endorse this tech stack for anyone wanting a static website.

What follows is an overview of some performance best practices and how I’ve been able to adhere to them with my development and production setup.

## HTML

### Minify HTML
The HTML gets minified by [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin), which collapses whitespace and removes comments, amongst other small improvements.

- It also minifies inline JavaScript (with [UglifyJS](https://github.com/mishoo/UglifyJS2)) and inline CSS (with [clean-css](https://github.com/jakubpawlowicz/clean-css))
- And there’s an option to `keepClosingSlash`, which are needed for my inline SVGs.

## CSS

### Lint CSS
My Sass is linted with [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint), which ensures that I don’t introduce any inconsistencies, poor practices, or general cruft into my CSS. This results in a well organized stylesheet.

### Use Autoprefixer
All the vendor prefixes are managed by [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) so that I have effortless control over which browsers I support when writing my CSS. I no longer need to worry about having unnecessary vendor prefixes in my CSS rules.

### Concatenate CSS
The CSS is written in [Sass](http://sass-lang.com/) and organized via partials that compile to one stylesheet. If my CSS were in multiple files, I’d use [grunt-usemin](https://github.com/yeoman/grunt-usemin) to send those files to [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) for concatenation.

### Sort CSS
My compiled CSS is sorted with [grunt-csscomb](https://github.com/csscomb/grunt-csscomb) to improve gzip compression, although my styles are lean enough that this hasn’t made any difference.

Read about the benefits of sorting CSS properties at [Reduce file size with CSS Sorting](http://peteschuster.com/2014/12/reduce-file-size-css-sorting/).

### Minify CSS
The CSS gets minified by [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin), which uses [clean-css](https://github.com/jakubpawlowicz/clean-css) under the hood.

### Inline Critical CSS
The above the fold CSS is generated with [grunt-penthouse](https://github.com/fatso83/grunt-penthouse) and inlined into the `<head>` with an include.

### Load CSS Asynchronously
The whole stylesheet is loaded asynchronously with [loadCSS](https://github.com/filamentgroup/loadCSS). An improvement could be made here to only load the styles that weren’t inlined, although I haven’t found a good way to do that.

## Fonts
I only support the WOFF and [WOFF2](https://gist.github.com/sergejmueller/cf6b4f2133bcb3e2f64a) font formats and have them asynchronously loaded with [fontloader.js](https://github.com/bdadam/OptimizedWebfontLoading) (and its loadFont() function) so that they’re no longer blocking the page from loading.

More information about this technique (and related ones) at [Better webfont loading with using localStorage and providing WOFF2 support](http://bdadam.com/blog/better-webfont-loading-with-localstorage-and-woff2.html).

## JavaScript

### Lint JavaScript
My JavaScript is validated with [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint), which helps ensure that its error free. I also don’t have very much of it since my websites are relatively simple functionality-wise.

### Concatenate JavaScript
I use [grunt-usemin](https://github.com/yeoman/grunt-usemin) to send my JavaScript files to [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) for concatenation.

### Minify JavaScript
A plugin of many talents, [grunt-usemin](https://github.com/yeoman/grunt-usemin) sends the JavaScript to [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) to be minified.

### Load JavaScript Last
Save for the aforementioned loadCSS() and loadFont() functions, the rest of my JavaScript is loaded just before the closing `</body>` tag.

## Images

### Optimize Images
For this website, I use [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) to compress the size of my images. For Webworke.rs I use [grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim) and find the latter plugin results in smaller filesizes.

### Serve Scaled Images
For Webworke.rs I’ve implemented [jekyll-picture-tag](https://github.com/robwierzbowski/jekyll-picture-tag) and that allows me to use the `<picture>` element with [picturefill](https://github.com/scottjehl/picturefill) polyfill.

## SVG

### Minify SVGs
My SVGs get minified by [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin), although I also do some editing by hand before committing them into version control.

### Inline SVGs
I inline all my SVGs with Jekyll, so I save requests at the expense of browsers I don’t support. I’d consider using [grunticon](https://github.com/filamentgroup/grunticon) for less feature rich browsers.

## Server

### Hosting on GitHub Pages
In and of itself, GitHub Pages is incredibly fast and reliable, as well as free! It makes a lot of sense to take advantage of the hosting, especially when your site’s source code is already put into version control and stored on GitHub.

### CloudFlare for Everything Else
I host my DNS with CloudFlare, which opens up a whole world of server-side optimizations. I get my site served by a CDN, compression of my assets via gzip, the ability to set the TTL for static resources (the whole site, basically) for browser caching, and SSL (even though the connection from GitHub Pages to CloudFlare is unencrypted, but hey beggars can’t be choosers).

## Results

### WebPagetest
<img src="/img/srcset/2015-01-15-webpagetest.png" alt="Webpagetest.org results for davidensinger.com" class="media-full srcset-full" />

### Google PageSpeed Insights
<img src="/img/srcset/2015-01-15-google-pagespeed-insights-mobile.png" alt="Google PageSpeed Insights results for davidensinger.com" class="media-half-to-third srcset-half-to-third" />

### YSlow
<img src="/img/srcset/2015-01-15-yslow.png" alt="YSlow results for davidensinger.com" class="media-full srcset-full" />

## Todo
I still have work to do and the following is my shortlist of improvements to implement in these coming months:

- lazy load my images
- switch to grunt-imageoptim (for this site)
- start using the `srcset` by finding a good workflow to generate the images and markup
