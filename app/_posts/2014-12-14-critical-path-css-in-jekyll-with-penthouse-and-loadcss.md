---
date: 2014-12-14 15:14:00
layout: post
title: 'Critical Path CSS in Jekyll with Penthouse and loadCSS'
description: 'Say goodbye to render-blocking CSS in above-the-fold content.'
tags: ['Jekyll', 'Grunt', 'Webperf']
suggested_tweet:
  hashtags: ['CSS', 'Jekyllrb', 'GruntJS']
  related: ['jekyllrb']
---

With every passing month more and more people are browsing the internet via their mobile devices. It only makes sense for us as developers to optimize our sites for those visitors, who may be using an unreliable or slow internet connection when visiting our sites.

There are [many optimizations](https://developers.google.com/speed/docs/insights/rules) one can make, but this post will focus on elimating blocking CSS requests from the `<head>` by inlining the above-the-fold CSS and then asynchronously loading the site’s stylesheet. We’ll do this with the following tools:

- [grunt-penthouse](https://github.com/fatso83/grunt-penthouse), a wrapper for [Penthouse](https://github.com/pocketjoso/penthouse), a tool for generating critical path CSS
- [loadCSS](https://github.com/filamentgroup/loadCSS), a function for loading CSS asynchronously.

As [previously covered](http://davidensinger.com/2014/11/ode-to-grunt-yeoman-and-generator-jekyllrb/), this site was scaffolded by [Generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb), a Yeoman generator for building sites with Jekyll. What follows is my implementation, which should be of interest for others with similar development setups for Jekyll.

## Generate the CSS
The first step is to install grunt-penthouse and configure the task in the **Gruntfile**.

{% highlight js %}
watch: {
    sass: {
        files: ['<%= yeoman.app %>/_scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer:server', 'penthouse']
    }
}
penthouse: {
    server : {
        outfile: '<%= yeoman.app %>/_includes/critical.css',
        css: '.tmp/css/styles.css',
        url: 'http://localhost:3000',
        width: 1280,
        height: 800
    }
}
{% endhighlight %}

I run the `penthouse` task after any change to my Sass files, which ensures that my critical path CSS is up-to-date. This works out well because it doesn’t make my workflow any more complicated than it needs to be.

The **critical.css** is saved in my **_includes** directory, which allows me to easily inline it into my site’s markup. I’ve also added the CSS to my **.gitignore**, since there’s no benefit to versioning it.

I’ve elected to generate the critical CSS with dimensions that are desktop first, which may seem counterintuitive. I’m doing this to ensure that I get the CSS that’s required for my site’s sidebar. On a mobile device it’s most likely below-the-fold, but on a wider viewport it displays above-the-fold.

Your website design will obviously differ from my own, so it would be prudent to test out different dimensions when generating the critical path CSS.

## Inline the CSS
In my **header.html** include I’ve inlined the critical CSS and then added the loadCSS function, which will asynchronously load my stylesheet.

{% highlight html %}
{% raw %}{% if site.environment == 'production' %}
    <style>{% include critical.css %}</style>
    <script>
        {% include loadCSS.js %}
        loadCSS("/css/styles.css");
    </script>
    <noscript>
{% endif %}

<!-- build:css({app,.tmp}) /css/styles.css -->
<link href="/css/styles.css" rel="stylesheet" type="text/css">
<!-- endbuild -->

{% if site.environment == 'production' %}
    </noscript>
{% endif %}{% endraw %}
{% endhighlight %}

You can see that I make use of a faux environmental variable to conditionally print markup.

My “development” environment is provided courtesy of `grunt serve`, while my “production” environment is `grunt build`. These variables are saved in their respective **_config** files.

I only inline my above-the-fold CSS, print the markup to asynchronously load my stylesheet, and wrap my `<link>` tag with a `<noscript>` when I’m ready to build the site for deployment.

## Filerev the CSS
The stylesheet in our [usemin](https://github.com/yeoman/grunt-usemin) block will be [revved](https://github.com/yeoman/grunt-filerev), which requires a corresponding revving of the stylesheet within the loadCSS function. This can be resolved with a regular expression in a custom usemin pattern.

{% highlight js %}
usemin: {
  options: {
    assetsDirs: '<%= yeoman.dist %>',
    patterns: {
      html: [
        [/loadCSS\(['"]([^"']+)['"]\)/gm, 'Replacing reference to CSS within loadCSS']
      ]
    }
  },
  html: ['<%= yeoman.dist %>/**/*.html'],
  css: ['<%= yeoman.dist %>/css/**/*.css']
}
{% endhighlight %}

Please note that until grunt-usemin 3.0.0, a custom pattern with the same name as a default pattern would replace it, instead of merging it.

## In Summary
Those were the highlights! Feel free to dig through [this site’s repository](https://github.com/davidensinger/davidensinger.github.io) for more context regarding these example snippets of code.

Also, a big thanks to the developers of [Penthouse](https://github.com/pocketjoso/penthouse), [grunt-penthouse](https://github.com/fatso83/grunt-penthouse), and [loadCSS](https://github.com/filamentgroup/loadCSS) for simplifying what could potentially be a very complicated workflow.
