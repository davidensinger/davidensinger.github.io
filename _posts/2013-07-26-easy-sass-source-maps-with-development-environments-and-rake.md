---
date: 2013-07-26 13:26:00
layout: post
slug: easy-sass-source-maps-with-development-environments-and-rake
title: Easy Sass Source Maps with Development Environments and Rake
description: Create development environments with Rake to easily switch between development and production builds of Sass.
categories: [Development]
tags: [Rake, Sass]
---

In addition to [automating the deployment of Jekyll](http://davidensinger.com/2013/07/automating-jekyll-deployment-to-github-pages-with-rake/), I also wrote a couple Rake tasks to streamline the building of my site. They’re quite simple, but they allow me to have environments for both development and production. It’s now just as easy to use Sass source maps in my development environment as it is to build compressed assets for production.

## Source Maps in Sass
So what are [Source Maps](http://net.tutsplus.com/tutorials/tools-and-tips/source-maps-101/)? Basically they’re what link the compiled code that you see in your browser to the original source files that live in your development environment. This makes it really simple to debug code that may otherwise be quite difficult to work through.

### How to
It’s fairly straightforward to set up source maps in Sass for viewing in Chrome. Thankfully, the process has been well documented by Tim Lucas in his article, “[Getting started with CSS sourcemaps and in-browser Sass editing](https://medium.com/what-i-learned-building/b4daab987fb0).” I’ll still lay out the high-level steps here, though:

1. Install **Sass 3.3+**
2. Run Sass with the `--sourcemap` flag
3. Enable **CSS Source Maps** support in [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html)

Once you’ve followed those steps you should be able to inspect CSS properties in DevTools and then click them to go straight to their source. Pretty neat, right?

## Setting up Environments with Rake
Now that the source maps are working, it’s time to set up a way to switch between the compiled Sass for development and for production. To do this, I’ve created a couple tasks with Rake:

### Development
To start my development, I use the following Rake task, which is based off the work of Nick Quaranto in “[Use Jekyll, SCSS, and CoffeeScript without plugins](http://quaran.to/blog/2013/01/09/use-jekyll-scss-coffeescript-without-plugins/).” The task starts Sass and Jekyll with the desired flags, although note that it must first run the `:recompile_sass` task, which I’ll go over shortly.

{% highlight ruby %}
desc "Build _site/ for development"
task :dev => :recompile_sass do
  puts "\n##  Starting Jekyll and compiling Sass with source map"
  pids = [
    spawn("sass --sourcemap --watch assets/scss/styles.scss:assets/css/styles.css"),
    spawn("jekyll serve -w")
  ]

  trap "INT" do
    Process.kill "INT", *pids
    exit 1
  end

  loop do
    sleep 1
  end
end
{% endhighlight %}

### Production
To build for production, I use the following task, which compiles the Sass (note the `--style compressed`), builds Jekyll, and then deletes the leftover source map file for Sass. Again, the task must `:recompile_sass` before starting.

{% highlight ruby %}
desc "Build _site/ for production"
task :pro => :recompile_sass do
  puts "\n## Compiling Sass"
  status = system("sass --style compressed assets/scss/styles.scss:assets/css/styles.css")
  puts status ? "Success" : "Failed"
  puts "\n## Building Jekyll to _site/"
  status = system("jekyll build")
  puts status ? "Success" : "Failed"
  puts "\n## Deleting Sass source map"
  status = system("rm -f _site/assets/css/*.map")
  puts status ? "Success" : "Failed"
end
{% endhighlight %}

## Force Sass to Recompile
For both my development and production Rake tasks I force Sass to recompile. I do this because Sass recompiles only when the compiled CSS has been deleted or when the Sass has been modified.

{% highlight ruby %}
desc "Recompile Sass"
task :recompile_sass do
  puts "\n## Forcing Sass to recompile"
  status = system("touch -m assets/scss/styles.scss")
  puts status ? "Success" : "Failed"
end
{% endhighlight %}

## Complete Tasks
The following are the complete Rake tasks. You’ll notice that I’ve namespaced the build tasks, as well as invoked a minify task, which I’ll go over in a future post.

{% highlight ruby %}
desc "Recompile Sass"
task :recompile_sass do
  puts "\n## Forcing Sass to recompile"
  status = system("touch -m assets/scss/styles.scss")
  puts status ? "Success" : "Failed"
end

namespace :build do
  desc "Build _site/ for development"
  task :dev => :recompile_sass do
    puts "\n##  Starting Jekyll and recompiling Sass with source map"
    pids = [
      spawn("sass --sourcemap --watch assets/scss/styles.scss:assets/css/styles.css"),
      spawn("jekyll serve -w")
    ]

    trap "INT" do
      Process.kill "INT", *pids
      exit 1
    end

    loop do
      sleep 1
    end
  end

  desc "Build _site/ for production"
  task :pro => :recompile_sass do
    puts "\n## Compiling Sass"
    status = system("sass --style compressed assets/scss/styles.scss:assets/css/styles.css")
    puts status ? "Success" : "Failed"
    puts "\n## Building Jekyll to _site/"
    status = system("jekyll build")
    puts status ? "Success" : "Failed"
    Rake::Task["minify"].invoke
    puts "\n## Deleting Sass source map"
    status = system("rm -f _site/assets/css/*.map")
    puts status ? "Success" : "Failed"
  end
end
{% endhighlight %}

