---
date: 2013-07-23 13:24:00
layout: post
title: Automating Jekyll Deployment to GitHub Pages with Rake
description: Use Rake to easily deploy your site to GitHub Pages.
tags: [GitHub, Jekyll, Rake]
suggested_tweet:
  url: 'http://davidensinger.com/2013/07/automating-jekyll-deployment-to-github-pages-with-rake/'
  text: 'Automating Jekyll Deployment to GitHub Pages with Rake by @DavidEnsinger'
  hashtags: ['Jekyll', 'jekyllrb', 'GitHub', 'Git']
  related: ['jekyllrb']
---

I recently automated the deployment of my site to **GitHub Pages**, which is something that [I’ve wanted to do for awhile](http://davidensinger.com/2013/04/deploying-jekyll-to-github-pages/). Whereas I would previously enter a string of commands into the terminal, I now use **Rake** to handle those commands for me.

## What is Rake
For those who don’t know (and this was me until recently), [Rake](http://rake.rubyforge.org/) is “a simple ruby build program with capabilities similar to make.” In other words, it’s a tool that helps automate the tedium that often comes with managing a website.

<div class="gray-box">
  <p><strong>More Info:</strong> Jason Seifer has a pretty good <a href="http://jasonseifer.com/2010/04/06/rake-tutorial">Rake Tutorial</a> for developers new to Rake.</p>
</div>

## My Workflow
I’ve set up Jekyll to consist of two branches: **source** and **master**. The source branch consists of the entire project and as such tracks all changes, while the master branch consists solely of the compiled site, which can be found in the **_site** subdirectory.

My typical workflow is to write a post (or modify the site design) and then commit whatever I’ve changed until the only files that remain uncommitted are in the **_site** subdirectory. I then stage and commit those files with a generic message that includes the current time.

## Commit
Here’s what my commit rake task currently looks like, although I’d consult the [Rakefile](https://github.com/davidensinger/davidensinger.github.io/blob/source/Rakefile) for a more future-proof version.

{% highlight ruby %}
desc "Commit _site/"
task :commit do
  puts "\n## Staging modified files"
  status = system("git add -A")
  puts status ? "Success" : "Failed"
  puts "\n## Committing a site build at #{Time.now.utc}"
  message = "Build site at #{Time.now.utc}"
  status = system("git commit -m \"#{message}\"")
  puts status ? "Success" : "Failed"
  puts "\n## Pushing commits to remote"
  status = system("git push origin source")
  puts status ? "Success" : "Failed"
end
{% endhighlight %}

# Deploy
Once everything is committed I go through the steps I outlined in [Deploying Jekyll with Plugins to GitHub Pages](http://davidensinger.com/2013/04/deploying-jekyll-to-github-pages/). Again, I’d check the [Rakefile](https://github.com/davidensinger/davidensinger.github.io/blob/source/Rakefile) in the event I change something and forget to update this post.

{% highlight ruby %}
desc "Deploy _site/ to master branch"
task :deploy do
  puts "\n## Deleting master branch"
  status = system("git branch -D master")
  puts status ? "Success" : "Failed"
  puts "\n## Creating new master branch and switching to it"
  status = system("git checkout -b master")
  puts status ? "Success" : "Failed"
  puts "\n## Forcing the _site subdirectory to be project root"
  status = system("git filter-branch --subdirectory-filter _site/ -f")
  puts status ? "Success" : "Failed"
  puts "\n## Switching back to source branch"
  status = system("git checkout source")
  puts status ? "Success" : "Failed"
  puts "\n## Pushing all branches to origin"
  status = system("git push --all origin")
  puts status ? "Success" : "Failed"
end
{% endhighlight %}

## Commit and Deploy
Finally, I’ve gone ahead and combined them into one task to save myself the burden of typing two separate commands everytime I want to update my website.

{% highlight ruby %}
desc "Commit and deploy _site/"
task :commit_deploy => [:commit, :deploy] do
end
{% endhighlight %}

## What’s Next?
Not only have I automated the deployment of my site, but I’ve also used Rake to create development and production builds. This has allowed me to implement Sass source maps and easily minify my assets, which I’ll detail in subsequent posts! Stay tuned :)

