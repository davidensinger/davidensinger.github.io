---
date: 2013-03-21 18:24:00
layout: post
slug: using-rems-with-sass
title: Using Rems with Sass
description: An argument for using a Sass mixin with pixel fallback to easily implement rems.
tags:
- Mixin
- Rem
- Sass
---

I used **rems** quite liberally with this redesign, especially with the typographic elements. Even though I initially shied away from them, I have since decided that any potential drawbacks are easily mitigated by using **Sass** to preprocess my CSS. 

Before we discuss rems, we need to first talk a little about ems.  

## What’s an Em?

”An em is a unit of measurement in the field of typography, equal to the currently specified point size,” as per [Wikipedia](http://en.wikipedia.org/wiki/Em_(typography). But for our purposes as web developers, it’s a measurement that’s equal to the font size of the parent element. Simple, right?

Not as simple as we’d like! Ems can be difficult to use in a manner that’s both efficient and predictable because changes in the font size are compounded by the cascade. In the past, this has been somewhat mitigated by setting the [font size of the body to 62.5%](http://clagnut.com/blog/348/), which ostensibly [makes the math easier](http://pxtoem.com/) to calculate. 

While that solution works moderately well, it seems rather convoluted in light of advances in modern web development. We are now able to use the rem unit, which stands for ”root em” and is just that, an em that is relative to the root element (`html`).

## Why Use Rems

By using rems we’re afforded the benefit of avoiding values that are compounded by the cascade. A heading that’s set to `1rem` is always `1rem`, regardless of the font size of its parent. This is much simpler than using ems, especially with elements that are nested several levels deep.

It should be noted that [browser support for rems](http://caniuse.com/#search=rem) is surprisingly good, save for IE 8. That shouldn’t deter us, so long as we provide the necessary pixel (`px`) fallback. We could hand code that, but there's a better way.

## Sass to the Rescue

Thankfully [Sass](http://sass-lang.com/) allows for mixins, which allows ”re-use of styles – properties or even selectors – without having to copy and paste them or move them into a non-semantic class.” Pretty neat!

When writing my SCSS, I initially did a cursory search for a rem mixin with pixel fallback. I found many that varied markedly in complexity and scope, although none of them fit my exact needs. 

### A Selection of Available Mixins

- [Mixins for Rem Font Sizing](http://css-tricks.com/snippets/css/less-mixin-for-rem-font-sizing/) via [CSS-Tricks](http://www.css-tricks.com/)
- [An Improved Sass Rem Mixin](http://intuio.at/en/blog/an-improved-sass-rem-mixin-for-unitless-numbers/) with unitless numbers by [@xon1c](http://twitter.com/xon1c) at [intuio.at](http://intuio.at/) 
- [Rem mixin](https://github.com/bitmanic/rem) by [bitmanic](https://github.com/bitmanic/)
- [Rem mixin](https://gist.github.com/webgefrickel/4530526) by [webgefrickel](https://github.com/webgefrickel)

I wanted a rem mixin that would support the input of a property with any number, type, and mix of values, such as:

{% highlight scss %}
@include rem(font-size, 14px);
@include rem(margin, 0 auto 1);
@include rem(padding-bottom, 3%);
{% endhighlight %}

The nearest to that ideal was the [Rem mixin](https://gist.github.com/webgefrickel/4530526) by [webgefrickel](https://github.com/webgefrickel), but that mixin doesn’t allow for auto or percentage (`%`) values. No matter, he graciously posted it as a Gist, which [I forked to make the small revisions](https://gist.github.com/davidensinger/5217667) I needed.

My modified version of the mixin:

{% highlight scss %}
@mixin rem($property, $values) {
  // Create a couple of empty lists as output buffers.
  $font-size: $base-font-size;
  $px-values: ();
  $rem-values: ();
 
  // Loop through the $values list
  @each $value in $values {
    // For each property value, if it's in rem or px, derive both rem and
    // px values for it and add those to the end of the appropriate buffer.
    // Ensure all pixel values are rounded to the nearest pixel.
    @if $value == 0 or $value == 0px {
      // 0 -- use it without a unit
      $px-values: join($px-values, 0);
      $rem-values: join($rem-values, 0);
    } @else if type-of($value) == number and not unitless($value) and (unit($value) == px) {
      // px value given - calculate rem value from font-size
      $new-rem-value: $value / $font-size;
      $px-values: join($px-values, round($value));
      $rem-values: join($rem-values, #{$new-rem-value}rem);
    } @else if type-of($value) == number and not unitless($value) and (unit($value) == "%") {
      // % value given - don't add px or rem
      $px-values: join($px-values, #{$value});
      $rem-values: join($rem-values, #{$value});
    } @else if $value == auto {
      // auto - don't add px or rem
      $px-values: join($px-values, auto);
      $rem-values: join($rem-values, auto);
    } @else {
      // unitless value - use those directly as rem and calculate the px-fallback
      $px-values: join($px-values, round($value * $font-size));
      $rem-values: join($rem-values, #{$value}rem);
    }
  }
 
  // output the converted rules
  #{$property}: $px-values;
  #{$property}: $rem-values;
}
{% endhighlight %}

I’m now able to use rems without worrying about browser support, which affords me more time to design and write.