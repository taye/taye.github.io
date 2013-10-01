---
layout      : post
title       : "Path snapping in interact.js"
date        : 2013-09-29 15:36:26
categories  : [interact-js, snap]
tags        : [interact.js, snap, custom snap, functional, drag-and-drop, drag and drop, draggable, droppable]
excerpt     : path snapping now lets you set fixed axis origin points or use functions to return the points that the pointer should snap to.
published   : true

---
<script src="{{ site.baseurl }}/js/interact.js"></script>
<script src="{{ site.baseurl }}/js/underscore.js"></script>
<script src="{{ site.baseurl }}/js/ijs-demo.js"></script>
<style type="text/css" src="{{ site.baseurl }}/css/taye.css"></style>

[interact.js][ijs-gh] just got even snappier. `path` snapping now lets you set fixed axis origin points or use functions to return the points that the pointer should snap to.

<div class="snap-example">
<div class="canvas-group">
<canvas id="line-path"> </canvas>
<canvas id="line-drag" class="overlay-canvas"> </canvas>
</div>
<div class="snippet">

{% highlight javascript %}
paths: [{
    y: 75,
    range: Infinity
}]
{% endhighlight %}

</div>
</div>

<div class="snap-example">
<div class="canvas-group">
<canvas id="sin-path" > </canvas>
<canvas id="sin-drag" class="overlay-canvas"> </canvas>
</div>
<div class="snippet">

{% highlight javascript %}
paths: [function (x, y) {
    return {
        y: (75 + 50 * Math.sin(x * 0.04)),
        range: Infinity
    };
}]
{% endhighlight %}

</div>
</div>

<div class="snap-example">
<div class="canvas-group">
<canvas id="square-path" > </canvas>
<canvas id="square-drag" class="overlay-canvas"> </canvas>
</div>
<div class="snippet">

{% highlight javascript %}
paths: [function (x, y) {
    return {
        y: x % 100 < 50? 50: 100,
        range: Infinity
    };
}]
{% endhighlight %}

</div>
</div>
[ijs-gh]: https://github.com/taye/interact.js
