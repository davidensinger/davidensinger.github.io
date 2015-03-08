---
date: 2014-07-30 15:57:00
layout: post
title: 'Fun with JSTL in JSPs'
description: 'And now for something completely different.'
tags: ['JSTL', 'Java', 'JSP']
suggested_tweet:
  hashtags: ['JSTL', 'Java', 'JSP']
---

It’s often difficult to find good documentation for JSTL. It’s either too technical or is so poorly designed that you swear you’re browsing within an enterprise Java intranet (is anyone surprised?). Since I’ve often found myself searching for the same information over and again, I’ve taken the time to write down the features I use most frequently.

## Comments
To comment out code, it’s preferable to use hidden comments, which don’t get printed:

    <%-- This will never been seen on production. --%>
    <!-- But this will, although why would you want that? -->

## Operators
Both arithmetic and logical operators are supported:
<table>
  <caption>Table of Operators:</caption>
  <thead>
    <tr>
      <th>Operator</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.</td>
      <td>Access a bean property or Map entry</td>
    </tr>
    <tr>
      <td>[]</td>
      <td> Access an array or List element</td>
    </tr>
    <tr>
      <td>( )</td>
      <td> Group a subexpression to change the evaluation order</td>
    </tr>
    <tr>
      <td>+</td>
      <td>Addition</td>
    </tr>
    <tr>
      <td>-</td>
      <td> Subtraction or negation of a value</td>
    </tr>
    <tr>
      <td>*</td>
      <td> Multiplication</td>
    </tr>
    <tr>
      <td>/ or div</td>
      <td> Division</td>
    </tr>
    <tr>
      <td>% or mod</td>
      <td> Modulo (remainder)</td>
    </tr>
    <tr>
      <td>== or eq</td>
      <td> Test for equality</td>
    </tr>
    <tr>
      <td>!= or ne</td>
      <td> Test for inequality</td>
    </tr>
    <tr>
      <td>&lt; or lt</td>
      <td>Test for less than</td>
    </tr>
    <tr>
      <td>&gt; or gt</td>
      <td> Test for greater than</td>
    </tr>
    <tr>
      <td>&lt;= or le</td>
      <td>Test for less than or equal</td>
    </tr>
    <tr>
      <td>&gt;= or gt</td>
      <td>Test for greater than or equal</td>
    </tr>
    <tr>
      <td>&amp;&amp; or and</td>
      <td>Test for logical AND</td>
    </tr>
    <tr>
      <td>|| or or</td>
      <td> Test for logical OR</td>
    </tr>
    <tr>
      <td>! or not</td>
      <td> Unary Boolean complement</td>
    </tr>
    <tr>
      <td>empty </td>
      <td>Test for empty variable values</td>
    </tr>
  </tbody>
</table>

## Set
Use the `set` tag to create a new variable or assign a value to a new or existing variable.
<table>
  <caption>Table of Attributes:</caption>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description </th>
      <th>Required</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>value</td>
      <td>Information to save</td>
      <td>No</td>
      <td>body</td>
    </tr>
    <tr>
      <td>target</td>
      <td>Name of the variable whose property should be modified</td>
      <td>No</td>
      <td>None</td>
    </tr>
    <tr>
      <td>property</td>
      <td>Property to modify</td>
      <td>No</td>
      <td>None</td>
    </tr>
    <tr>
      <td>var</td>
      <td>Name of the variable to store information</td>
      <td>No</td>
      <td>None</td>
    </tr>
    <tr>
      <td>scope</td>
      <td>Scope of variable to store information</td>
      <td>No</td>
      <td>Page</td>
    </tr>
  </tbody>
</table>

### An Example
The following two variables have their respective values assigned with `set`:

    <c:set var="maxTopics" value="3" />
    <c:set var="displayClass" value="hiddenTablet" />

We’d then be able to use the variables like so, `${maxTopics}` and `${displayClass}` within our JSP.

## If
To evaluate an expression, use an `if` tag. If the condition is true, it will display the body content.
<table>
  <caption>Table of Attributes:</caption>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description </th>
      <th>Required</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>test</td>
      <td>Condition to evaluate</td>
      <td>Yes</td>
      <td>None</td>
    </tr>
    <tr>
      <td>var</td>
      <td>Name of the variable to store the condition's result</td>
      <td>No</td>
      <td>None</td>
    </tr>
    <tr>
      <td>scope</td>
      <td>Scope of the variable to store the condition's result</td>
      <td>No</td>
      <td>page</td>
    </tr>
  </tbody>
</table>

### An Example
In the following example of an author profile component, we test if the author has a photo and if so, we print it out:

{% highlight html %}
<div class="c c-authorProfile">
  <h4 class="authorProfile-heading">${authorProfile.fullName}</h4>
  <c:if test="${authorHasPhoto}">
    <img src="${authorProfile.photo}" alt="${authorProfile.fullName}" class="authorProfile-photo" />
  </c:if>
  <div class="authorProfile-biography">
    ${authorProfile.biography}
  </div>
</div>
{% endhighlight %}

## Choose
Much like a **switch** of **if else** statement, `choose` allows you to evaluate multiple conditions by using a combination of `when` and `otherwise` tags.

### An Example
This media object component tests if there’s a photo, or a video, or neither and then prints out the appropriate markup:

{% highlight html %}
<div class="c c-mediaObject">
  <h4 class="mediaObject-heading">${mediaObject.heading}</h4>
  <c:choose>
    <c:when test="${mediaObject.hasPhoto}">
      <img src="${mediaObject.photo}" alt="${mediaObject.description}" class="mediaObject-photo" />
    </c:when>
    <c:when test="${mediaObject.hasVideo}">
      <video controls class="mediaObject-video">
        <source src="${mediaObject.video}" type="video/mp4" />
      </video>
    </c:when>
    <c:otherwise>
      <p class="author-warning">Hey did you forget to author a photo or video? If not, perhaps a different component would be more appropriate.</p>
    </c:otherwise>
    <div class="mediaObject-text">
      ${mediaObject.text}
    </div>
  </c:choose>
</div>
{% endhighlight %}

## Ternary Operations
A ternary operator, which allows for an inline condition that evaluates to true or false:

{% highlight html %}
${condition ? 'when_true' : 'when_false'}
{% endhighlight %}

### A Couple Examples
Using a ternary operator is useful within a template because it allows for the addition of classes for use as styling hooks.

Here we use a ternary operator to print classes that denote whether the layout is one or two columns:

{% highlight html %}
<body class="t t-${templateName} ${hasTwoColumnsLayout ? 'l-twoColumns' : 'l-oneColumn'}">
  …
</body>
{% endhighlight %}

It may also be helpful to print out inline styles, although be weary about relying on this too often, as CSS should really be kept in stylesheets.

In this example we change the background color of the component to red when it’s not authored:

{% highlight html %}
<div class="c c-${componentName}" style="${componentNeedsAuthoring ? 'background-color: red' : ''}">
  …
</div>
{% endhighlight %}

## For Each
To iterate over a collection, use a `forEach` tag. There are a half-dozen attributes for use with the `forEach` tag and they can provide quite a bit of flexibility.
<table>
  <caption>Table of Attributes:</caption>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description </th>
      <th>Required</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>items</td>
      <td>Information to loop over</td>
      <td>No</td>
      <td>None</td>
    </tr>
    <tr>
      <td>begin</td>
      <td>Element to start with (0 = first item, 1 = second item, …)</td>
      <td>No</td>
      <td>0</td>
    </tr>
    <tr>
      <td>end</td>
      <td>Element to end with (0 = first item, 1 = second item, …)</td>
      <td>No</td>
      <td>Last element</td>
    </tr>
    <tr>
      <td>step</td>
      <td>Process every step items</td>
      <td>No</td>
      <td>1</td>
    </tr>
    <tr>
      <td>var</td>
      <td>Name of the variable to expose the current item</td>
      <td>No</td>
      <td>None</td>
    </tr>
    <tr>
      <td>varStatus</td>
      <td>Name of the variable to expose the loop status</td>
      <td>No</td>
      <td>None</td>
    </tr>
  </tbody>
</table>

### An Example
Here we have a component that displays an unordered list of links:

{% highlight html %}
<div class="c c-linkList">
  <h4 class="linkList-heading">${linkList.heading}</h4>
  <ul class="linkList-list">
    <c:forEach var="link" items="${linkList.links}">
      <li class="linkList-item"><a href="${link.href}" class="linkList-link">${link.text}</a></li>
    </c:forEach>
  </ul>
</div>
{% endhighlight %}

## forEach varStatus Properties
The `varStatus` attribute comes with some helpful properties.
<table>
  <caption>Table of varStatus Properties:</caption>
  <thead>
    <tr>
      <th>Property</th>
      <th>Getter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>current</td>
      <td>getCurrent()</td>
      <td>The item (from the collection) for the current round of iteration</td>
    </tr>
    <tr>
      <td>index</td>
      <td>getIndex()</td>
      <td>The zero-based index for the current round of iteration</td>
    </tr>
    <tr>
      <td>count</td>
      <td>getCount()</td>
      <td>The one-based count for the current round of iteration</td>
    </tr>
    <tr>
      <td>first</td>
      <td>isFirst()</td>
      <td>Flag indicating whether the current round is the first pass through the iteration</td>
    </tr>
    <tr>
      <td>last</td>
      <td>isLast()</td>
      <td>Flag indicating whether the current round is the last pass through the iteration</td>
    </tr>
    <tr>
      <td>begin</td>
      <td>getBegin()</td>
      <td>The value of the begin attribute</td>
    </tr>
    <tr>
      <td>end</td>
      <td>getEnd()</td>
      <td>The value of the end attribute</td>
    </tr>
    <tr>
      <td>step</td>
      <td>getStep()</td>
      <td>The value of the step attribute</td>
    </tr>
  </tbody>
</table>

### An Example
A couple useful properties are `first` and `last`, which are used to delimit a list of authors in the following example from a byline component:

{% highlight html %}
<div class="c c-authorByline">
  <c:forEach var="author" items="${site.authors}" varStatus="status">
    <span class="author-byline">
      <c:if test="${status.first and not status.last}">by</c:if>
      <c:if test="${not status.first and status.last}">and</c:if>
      <a href="${author.linkHref}" class="author-byline--link">${author.fullName}</a>
      <c:if test="${not status.first and not status.last}">,</c:if>
    </span>
  </c:forEach>
</div>
{% endhighlight %}

## Functions
There are a lot of standard functions included in JSTL, although you probably shouldn’t use them. The majority of the functionality they provide is either better done in the model (and not the view) or can be accomplished with CSS. I very seldom find myself using anything other `fn:length()`, which I use to find the number of items in a collection.
<table>
  <caption>Table of Functions:</caption>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fn:contains()</td>
      <td>Tests if an input string contains the specified substring.</td>
    </tr>
    <tr>
      <td>fn:containsIgnoreCase()</td>
      <td>Tests if an input string contains the specified substring in a case insensitive way.</td>
    </tr>
    <tr>
      <td>fn:endsWith()</td>
      <td>Tests if an input string ends with the specified suffix.</td>
    </tr>
    <tr>
      <td>fn:escapeXml()</td>
      <td>Escapes characters that could be interpreted as XML markup.</td>
    </tr>
    <tr>
      <td>fn:indexOf()</td>
      <td>Returns the index withing a string of the first occurrence of a specified substring.</td>
    </tr>
    <tr>
      <td>fn:join()</td>
      <td>Joins all elements of an array into a string.</td>
    </tr>
    <tr>
      <td>fn:length()</td>
      <td>Returns the number of items in a collection, or the number of characters in a string.</td>
    </tr>
    <tr>
      <td>fn:replace()</td>
      <td>Returns a string resulting from replacing in an input string all occurrences with a given string.</td>
    </tr>
    <tr>
      <td>fn:split()</td>
      <td>Splits a string into an array of substrings.</td>
    </tr>
    <tr>
      <td>fn:startsWith()</td>
      <td>Tests if an input string starts with the specified prefix.</td>
    </tr>
    <tr>
      <td>fn:substring()</td>
      <td>Returns a subset of a string.</td>
    </tr>
    <tr>
      <td>fn:substringAfter()</td>
      <td>Returns a subset of a string following a specific substring.</td>
    </tr>
    <tr>
      <td>fn:substringBefore()</td>
      <td>Returns a subset of a string before a specific substring.</td>
    </tr>
    <tr>
      <td>fn:toLowerCase()</td>
      <td>Converts all of the characters of a string to lower case.</td>
    </tr>
    <tr>
      <td>fn:toUpperCase()</td>
      <td>Converts all of the characters of a string to upper case.</td>
    </tr>
    <tr>
      <td>fn:trim()</td>
      <td>Removes white spaces from both ends of a string.</td>
    </tr>
  </tbody>
</table>

### An Example
In the following example we only print out the search results if there are more than zero, otherwise we tell the user to try a different search term.

{% highlight html %}
<div class="c c-siteSearch">
  <h4 class="siteSearch-heading">${siteSearch.heading}</h4>
  <c:choose>
    <c:when test="${fn:length(siteSearch.queryResults) > 0}">
      …
    </c:when>
    <c:otherwise>
      <p class="siteSearch-warning">Sorry your search has found no results. Please try a different query!</p>
    </c:otherwise>
  </c:choose>
</div>
{% endhighlight %}
