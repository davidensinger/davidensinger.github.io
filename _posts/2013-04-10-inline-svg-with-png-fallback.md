---
date: 2013-04-10 21:41:00
layout: post
slug: inline-svg-with-png-fallback
title: Inline SVG with PNG Fallback
description: How to use inline SVG with PNG fallback, courtesy of foreignObject and base64.
tags:
- SVG
---

Notice anything different about my balloon logo? Probably not, as the change is subtle, but the image is now an **inline SVG** instead of an **SVG background image**. I did this to allow the colors of the balloon to darken on hover.

Using an inline SVG is the only way to do this, as the browser regards the other implementations of SVG as externally linked files. That prevents the browser from respecting any inline CSS pseudo classes within the SVG.

As an added benefit, an HTTP request is saved, although this boon to page load optimization is at the expense of the tidiness of the markup. It’s not such a drawback, especially if the HTML will be minified before being deployed.

As for browser support, [inline SVGs are supported by all modern browsers](http://caniuse.com/#feat=svg-html5), so long as the proper **HTML5 DOCTYPE** (`<!DOCTYPE html>`) is declared. Not surprisingly, IE8 doesn’t support inline SVGs, so a fallback is needed for the small percentage of visitors who use that browser.

The obvious choice for an image fallback is a PNG since they support alpha transparency and are easily optimized for file size with [ImageAlpha](http://pngmini.com/) and [ImageOptim](http://imageoptim.com/).

## How Best to Fallback?

I initially considered replacing the inline SVG markup with an `img` tag via either **JavaScript** or **jQuery**, but decided against it. The user may have JavaScript disabled and if I elect to use jQuery I’ll need to make an additional HTTP request to load the library.

Thankfully, I stumbled upon [a better solution](http://www.kaizou.org/2009/03/inline-svg-fallback/) that makes use of [foreignObject](https://developer.mozilla.org/en-US/docs/SVG/Element/foreignObject) and [switch](https://developer.mozilla.org/en-US/docs/SVG/Element/switch), which are both elements specific to SVG.

> The `foreignObject` element allows for inclusion of a foreign
> XML namespace which has its graphical content drawn by a
> different user agent.
> 
> <cite>[Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/SVG/Element/foreignObject)</cite>

With `foreignObject` I can insert fallback **HTML** into the SVG, which will look like this:

{% highlight xml %}
<svg>
  SVG
  <foreignObject>
    Fallback HTML
  </foreignObject>
</svg>
{% endhighlight %}

The final step is to put the SVG code into a **group** (`g`) and then wrap the group and foreignObject in a **switch** (`switch`) element. The switch will then evaluate the children elements in order. The first element that has the proper attributes will be rendered, which will be the the group with the SVG. 

{% highlight xml %}
<svg>
  <g>
    SVG
  </g>
  <foreignObject>
    Fallback
  </foreignObject>
</svg>
{% endhighlight %}

Browsers that support SVG will render the inline SVG, while older browsers will instead display the foreignObject, which contains the fallback PNG. Easy and efficient, right?

Unfortunately, both the SVG and the image fallback will be loaded by the browser. This isn’t such a big deal, so long as the image is optimized and then converted to a **base64 string**, thus saving another HTTP request. I recommend my [favorite converter](http://webcodertools.com/imagetobase64converter) for the task!


