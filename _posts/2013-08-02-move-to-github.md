---
layout: post
title: "github &lt;3"
description: ""
category: blog
tags: [blog,github]
comments: true
---

[jekyllbootstrap]: http://jekyllbootstrap.com/usage/jekyll-quick-start.html
[bootstrap]: http://getbootstrap.com/

![github](assets/public/img/octobiwan.png "Octobiwan")

This blog now runs on github pages and I love it &lt;3.
I used [jekyllbootstrap] to set it up - took about a minute!

I tweaked the thing a bit here and there and changed the theme
to use [bootstrap v3][bootstrap]. Getting started with jekyll was a bit bumpy,
but I like the concept. 

Next step is to add some plugins to embedd code, github repos and stuff and of course
producing some content. Well, stay stuned.

---

Just added something to hightlight code:
{% highlight javascript linenos=table %}
(function() {
  var awesome = 'github';
})();
{% endhighlight %}

Like it so far .. but I read, that the jekyll engine has some problems with long lines.
Maybe I switch to gists or something if this anoyes me.