---
layout: post
title: "node.js and require.js compatible modules"
description: ""
category: coding
tags: [js,javascript,nodejs]
comments: true
published: false
---
{% include JB/setup %}

I recently wrote a JavaScript module that I wanted to use both in node.js and the browser.
node.js has it's own system to load dependencies using the ***require*** keyword: 

{% highlight javascript linenos=table %}
// example loading the underscore lib
var _ = require('underscore');

var obj1 = { test: 1 };
var obj2 = _.extend( {}, obj1 );

obj2.test = 2;

console.log( obj1, obj2 );
{% endhighlight %}

In this case, the **underscore** library is loaded synchronously. That means, the script waits in line 2 until the library is loaded from disk and all its code is executed until this example continues.

In the browser on the other hand, I'am using require.js to manage my modules and generate a build ( that combines all modules for deployment ). The above example looks a bit different using require.js:

{% highlight javascript linenos=table %}
// example loading the underscore lib
define(['underscore'], function( _ ) {
  var obj1 = { test: 1 };
  var obj2 = _.extend( {}, obj1 );

  obj2.test = 2;

  console.log( obj1, obj2 );
});
{% endhighlight %}

A key difference here is, that require.js works asynchronously. A module written to run with require.js defines its dependencies in an array and passes a callback that will be executed once the deps are loaded and setup.

Since this a two different approaches, how can one write a module that works both in node.js and require.js? Well, it's not that difficult:

{% highlight javascript linenos=table %}

var module, define;
(function() {
  var mod = function( _ ) {
    var obj1 = { test: 1 };
    var obj2 = _.extend( {}, obj1 );

    obj2.test = 2;

    console.log( obj1, obj2 );
  };

  if ( module && module.exports ) {
    var _ = require('underscore');
    module.exports = mod( _ );
  }

  if ( define ) {
    define(['underscore'], function( _ ) {
      return mod( _ ); 
    }]);
  }

})( module, define );
{% endhighlight %}

As you can see you have to add a bit of boilerplate code to the module. 