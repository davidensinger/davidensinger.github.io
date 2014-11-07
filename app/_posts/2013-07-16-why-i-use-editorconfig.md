---
date: 2013-07-16 10:12:00
layout: post
title: 'Why I use EditorConfig'
description: 'An argument for using EditorConfig in projects.'
tags: ['EditorConfig', 'Sublime Text']
suggested_tweet:
  hashtags: ['EditorConfig', 'SublimeText']
  related: ['EditorConfig', 'sublimehq']
---

Have you ever found yourself switching between projects with vastly different [coding styles](http://en.wikipedia.org/wiki/Programming_style) or (gasp!) no consistent style at all? Most editors and IDEs allow for settings at both the user and project level, but neither of those options are ideal. Often there isn’t a settings file for the project and even if there were, it’s probably for an editor that you don’t use. The only other option is to have the editor auto-detect the settings, but that’s far from perfect.

## Enter EditorConfig
Thankfully, help has arrived in the form of [EditorConfig](http://editorconfig.org/), which is a file wherein one may define and then maintain a consistent coding style.

A description of the project:

> EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of **a file format** for defining coding styles and a collection of **text editor plugins** that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.
>
> <cite>[EditorConfig](http://editorconfig.org/#overview)</cite>

## Example EditorConfig file
The following is the [`.editorconfig`](https://github.com/davidensinger/davidensinger.github.io/blob/source/.editorconfig) file for this website:

{% highlight ini %}
# This file is for unifying the coding style for different editors and IDEs.
# More information at http://EditorConfig.org

# No .editorconfig files above the root directory
root = true

[*]
indent_style = space
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# Use 2 spaces for indentation in HTML, JavaScript, Ruby, SCSS, and XML

[*.{html,js,rb,scss,xml}]
indent_size = 2

[Gemfile*]
indent_size = 2

[Rakefile]
indent_size = 2

# Use 4 spaces for indentation in Markdown files

[*.md]
indent_size = 4
{% endhighlight %}

## Supported Properties
Here’s a shortlist of supported properties. See the [project’s website](http://editorconfig.org/#supported-properties) for an exhaustive list, although note that not all browser plugins support all properties.

- Indent style
- Indent size
- End of line
- Trim trailing whitespace
- Insert final newline

## Editor and IDE Support
There are plugins available for a host of editors and IDEs, although there are unfortunately some notable exceptions. I’m glad that my preferred editor, Sublime Text 2, [is supported](https://github.com/sindresorhus/editorconfig-sublime). It will be a glorious day in development land when there’s universal support for EditorConfig.

It’s 2013, so why are we still debating tabs versus spaces?! Set a standard and stick with it.
