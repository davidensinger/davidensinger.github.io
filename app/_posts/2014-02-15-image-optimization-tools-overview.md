---
date: 2014-02-15 14:42:00
layout: post
title: 'Image Optimization Tools Overview'
description: 'A run down of tools to optimize images for file size.'
tags: ['Image Optimization']
---

Invariably, the average website gets heavier with each passing year, which results in slower page loads for visitors. Most of this increase in page weight is due to the large file sizes of images. Odds are, as a developer, you’re guilty of this slow creep too, so you should take care to optimize your images to be as lightweight as possible.

## Online Tools
The following are available to use online, for free:

- [JPEGmini](http://www.jpegmini.com/main/shrink_photo): Per the docs, “Reduces the file size of JPEG photos by up to 5X”
- [Smush.it](http://www.smushit.com/ysmush.it/): Process JPG, GIF, and PNG images that are up to one megabyte in size
- [Compress PNG](http://compresspng.com/): Automatically converts BMP, ICO, GIF, and JPG to PNG
- [Compress JPEG](http://compressjpeg.com/): Automatically converts BMP and PNG to JPG
- [TinyPNG](https://tinypng.com/): In addition, has premium plugin for Photoshop
- [b64.io](http://b64.io/): Optimizes PNG, JPG, GIF or SVG and then converts to Base64

## Desktop Tools
These are my preferred applications when optimizing images. Also I can’t believe that __ImageOptim__ and __ImageAlpha__ are free because __they’re that good__.

- [JPEGmini](http://www.jpegmini.com/): An application, as well as an online tool
- [ImageOptim](http://imageoptim.com/): Losslessly optimizes PNG, JPG, and GIF
- [ImageAlpha](http://pngmini.com/): Lossy compression of 24-bit PNG

## Tooling with Grunt
If you’re using [Grunt](http://gruntjs.com/) then check out [Optimizing Images with Grunt](http://blog.grayghostvisuals.com/grunt/image-optimization/) and these plugins:

- [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin): Minify PNG, JPG, and GIF
- [ImageOptim-CLI](http://jamiemason.github.io/ImageOptim-CLI/): Uses __ImageOptim__, __ImageAlpha__, and __JPEGmini__
- [grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim): A plugin for Grunt for __ImageOptim-CLI__
