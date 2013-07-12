---
date: 2013-05-14 16:12:00
layout: post
slug: getting-started-with-sublime-text-2
title: Getting Started with Sublime Text 2
description: A quick start guide to configuring Sublime Text 2.
categories: [Development]
tags: [Sublime Text 2]
---

Although I switched to [Sublime Text 2](http://www.sublimetext.com/) more than a year ago, I only recently decided to take a good look at my configuration, with the end goal of increasing my productivity. What follows are my settings, which will hopefully help others work a bit smarter. If you’ve got any useful tips, please [tweet](https://twitter.com/davidensinger) at me!

## Hide Folders
It’s often helpful to hide folders so they’re not found when searching or using the Go to File shortcut (⌘ + T). Add the following line to your User Preferences (Preferences › Settings - User or ⌘,) to do so:

{% highlight json %}
"folder_exclude_patterns": [".git", ".svn", ".sass-cache"]
{% endhighlight %}

You can also use an asterisk to match file types instead of directories:

{% highlight json %}
"folder_exclude_patterns": ["*.psd"]
{% endhighlight %}

## Open Files as Tabs

The default behavior is to open a file in a new window. If you'd prefer tabs, add this line to your  User Preferences (Preferences › Settings - User or ⌘,):

{% highlight json %}
"open_files_in_new_window": false
{% endhighlight %}

## Pasting
Some projects use tabs, while others use spaces. It’s nice to easily copy and paste snippets of code between the two, without worrying about the indentation.

To adjust your indentation to match the context in which it’s pasted, use “Paste and Indent” for **⌘V** instead of the standard “Paste.”

To do this, add the following in your **Key Bindings - User file**:

{% highlight json %}
{ "keys": ["super+v"], "command": "paste_and_indent" },
{ "keys": ["super+shift+v"], "command": "paste" }
{% endhighlight %}

## Shortcuts
There are a lot of really useful keyboard shortcuts in Sublime Text 2. Instead of listing them all, I’m going to list some favorites. With a quick search of the internet you’ll surely find more to integrate into your workflow.

- **⌘L** - Select line
- **⌘D** - Select word (use this to select other occurrences, which is great for multiple editing)
- **⌘P** - Goto anything (use **#** to search within file and **:** to go to a line number)
- **⌘⌃G** - Select all occurrences of current word (again, helpful for multiple editing)
- **⌃⌘↑ (up) or ↓(down)** - Swap lines either up or down

<div class="yellow-box">
  <p><strong>More Info:</strong> Here’s a <a href="https://gist.github.com/lucasfais/1207002">Gist of Useful Shortcuts</a> by <a href="https://twitter.com/lucasfais">@lucasfais</a>.</p>
</div>

## Package Control
One of the best things about Sublime Text 2 is how extensible it is. There are hundreds of community developed plugins and with [Package Control](http://wbond.net/sublime_packages/package_control) it’s quick and easy to install, update, and remove them from your installation.

### Installation

1. Open Sublime Text 2 and press **ctrl `** (control backtick) to open the editor’s console.
2. Paste in the following code:

{% highlight python %}
import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print('Please restart Sublime Text to finish installation')
{% endhighlight %}

### Favorite Packages

- [All Autocomplete](https://github.com/alienhard/SublimeAllAutocomplete) - Allows autocompletion across open files
- [Browser Refresh](http://gcollazo.github.io/BrowserRefresh-Sublime/) - Refresh your browser from within the editor
- [EditorConfig](https://github.com/sindresorhus/editorconfig-sublime) - [Editor Config](http://editorconfig.org/) helps define and maintain consistent coding styles between different editors and IDEs
- [Modific](https://github.com/gornostal/Modific) -Highlight lines changed since the last commit
- [SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements) - Adds useful file operations to the sidebar, such as “New file”, “New folder”, etc
- [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter) - Lint code as you type
- [TrailingSpaces](https://github.com/SublimeText/TrailingSpaces) - Strips trailing whitespace from files

There are also innumerable packages to support syntax highlighting, linting, and snippets in any and all languages. You can easily [discover these via Package Control](http://wbond.net/sublime_packages/community).

## Spaces
Open **TrailingSpace's** preferences (**Preferences › Package Settings › TrailingSpaces › Settings - User**), and add:

{% highlight json %}
"trailing_spaces_include_current_line": false
{% endhighlight %}

Also add this to your global user preferences (**⌘,**):

{% highlight json %}
"trim_trailing_white_space_on_save": true
{% endhighlight %}

## Tabs to Spaces
The default indentation style uses tabs instead of spaces. If you want to change this, go to your user preferences (**Preferences › Settings - User** or **⌘,**) and add:

{% highlight json %}
"tab_size": 2,
"translate_tabs_to_spaces": true
{% endhighlight %}

## Other Resources
There are a multitude of resources available to users of Sublime Text 2. Here are some good ones to read through:

- [Official Documentation](http://www.sublimetext.com/docs/2/)
- [Unofficial Documentation](http://docs.sublimetext.info/en/latest/index.html)
- [Setting up Sublime Text 2](http://blog.alexmaccaw.com/sublime-text)
- [Sublime Text 2 Tips and Shortcuts](http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/)
- [7 handy text manipulation tricks in Sublime Text 2](http://whiletruecode.com/post/7-handy-text-manipulation-tricks-sublime-text-2)

