---
date: 2014-11-21 15:27:00
layout: post
title: 'Ode to Grunt, Yeoman, and Generator-jekyllrb'
description: 'It’s just too easy to develop, build, and deploy this site.'
tags: ['Jekyll', 'Grunt']
suggested_tweet:
  hashtags: ['Jekyll', 'Jekyllrb', 'GruntJS']
  related: ['jekyllrb']
---

About a year ago I learned about [Yeoman](http://yeoman.io/) and [Grunt](http://gruntjs.com/), two tools that have since changed my web development workflow drastically. I had just started development on [Webworke.rs](http://webworke.rs), which like this site is built with [Jekyll](http://jekyllrb.com/). I decided to look into a generator for Yeoman and lo and behold I discovered [Generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb), a fantastic project by [@robwierzbowski](https://github.com/robwierzbowski).

Per the project’s description:

> Generator-jekyllrb wraps the Jekyll static site generator in a Yeoman development workflow.
> Scaffold your site with Yo, manage front end packages with Bower, and automate development and
> build tasks with Grunt.
>
> Generator-jekyllrb is ideal for developing performant static sites and prototyping dynamic
> sites and apps (especially if the final version uses Yeoman too). It's also a great
> introduction to Yeoman if you're not familiar with JavaScript MV* frameworks.

## Why It’s Awesome
My favorite part to pairing Jekyll with Grunt is that I get the benefits of using both tools, without being locked into their respective disadvantages. I’m able to use Jekyll to write, organize, and build my content into static files, but I don’t let Jekyll handle any of my frontend assets, which is where Grunt comes in.

Sure Jekyll can compile Sass and CoffeeScript, but otherwise I need a plugin, a Ruby gem, and/or a Rakefile to automate my build tasks. All of this is much better done by Grunt via its large ecosystem of plugins. Let Jekyll do the content and templating, but use Grunt for all the build tasks.

## Notable Grunt Plugins
What follows are the most interesting Grunt plugins that I use to build this site:

### Development Tools
- [BrowserSync](https://github.com/shakyShane/grunt-browser-sync)

### Vendor Prefixes for CSS
- [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)

### JavaScript Code Quality
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [jshint-stylish](https://github.com/sindresorhus/jshint-stylish)

### Minification, Optimization, and Uglification
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
- [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin)
- [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin)
- [grunt-xmlmin](https://github.com/dtrunk90/grunt-xmlmin)

### Performance
- [grunt-pagespeed](https://github.com/jrcryer/grunt-pagespeed)
- [grunt-phantomas](https://github.com/stefanjudis/grunt-phantomas)

### Deployment to GitHub Pages
- [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control)

## Examples
For those who are interested, see my [Gruntfile.js](https://github.com/davidensinger/davidensinger.github.io/blob/source/Gruntfile.js) and [package.json](https://github.com/davidensinger/davidensinger.github.io/blob/source/package.json).