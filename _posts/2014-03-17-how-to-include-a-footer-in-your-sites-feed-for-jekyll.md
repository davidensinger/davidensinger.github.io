---
date: 2014-03-17 12:46:00
layout: post
title: How to Include a Footer in your Site’s Feed for Jekyll
description: Easily add a note at the bottom of every post for the readers who subscribe to your syndicated feed.
categories: [Development]
tags: [Jekyll, RSS, XML]
suggested_tweet:
  url: 'http://davidensinger.com/2014/03/how-to-include-a-footer-in-your-sites-feed-for-jekyll/'
  text: 'How to Include a Footer in your Site’s Feed for Jekyll by @DavidEnsinger'
  hashtags: ['jekyllrb']
---

Lots of folks read blogs via syndicated feeds, so it can’t hurt to provide them with a little additional content, whether it be a link to the original post, a copyright statement, or even links your social media profiles, in the footer of each feed entry.

## Example Footer for Feed Entry
The first step is to create an include for your entry footer, within which you’ll put whatever content you’d like your readers to see.

{% highlight html %}
{% raw %}
<br>
<hr>
<p>You’ve just read about <strong><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></strong> on <strong><a href="{{ site.url }}/">{{ site.title }}</a></strong>.</p>
<p>If you’d prefer to receive your updates in tweet form, please follow me on <strong><a href="https://twitter.com/DavidEnsinger">Twitter</a></strong>, otherwise I hope you’re enjoying the feed!</p>
{% endraw %}
{% endhighlight %}

You’ll then want to include your feed footer within the include for your feed’s entries, which will probably look a lot like the following (see the `{% raw %}{% include feed-footer.html %}{% endraw %}`):

{% highlight xml %}
{% raw %}
<entry>
  <title type="text">{{ post.title | xml_escape }}</title>
  <link rel="alternate" type="text/html" href="{{ site.url }}{{ post.url }}" />
  <id>{{ site.url }}{{ post.id }}</id>
  <published>{{ post.date | date: "%Y-%m-%dT%H:%M:%SZ" }}</published>
  <updated>{{ post.date | date: "%Y-%m-%dT%H:%M:%SZ" }}</updated>
  <content type="html"><![CDATA[ {{ post.content }} {% include feed-footer.html %} ]]></content>
</entry>
{% endraw %}
{% endhighlight %}

Also be sure to properly escape the data in your posts. I prefer to use `CDATA`, but Jekyll also comes with [a Liquid filter to escape XML](http://jekyllrb.com/docs/templates/#filters): `{% raw %}{{ post.content | xml_escape }}{% endraw %}`.
