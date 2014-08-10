---
layout      : post
title       : Creating the animated interact.js logo in SVG and SMIL
date        : 2014-08-10 14:15:50
categories  : [interact.js, svg]
tags        : [interact.js, logo, design, svg, smil, animation]
excerpt     : "Two of the three animated Δs start at full opacity and fade out
                while scaling up from 1 to 25 in 10 seconds and from 0 to 15 in
                7 seconds. The other fades in and then out while scaling down
                from 15 to 1 in 13 seconds."
published   : true

---

[interact.js][ijs] is a javascript project that I started for responding to
single and multi-pointer drags and gestures. The logo for the project is this:

<img src="{{ site.baseurl }}/img/ijs-anim.svg"
    style="width: 100%; max-height: 5em;">

The static graphics were created in [Inkscape][inkscape] and then animated
manually with [SMIL][mdn-smil].

Designing in Inkscape
---

I started with the idea of "interact.js" written plainly with a dotted line
joining the dots of the "i" and "j". This was boring so I thought about making
the line look a bit like something from an ECG. That wasn't great either but I
liked the angles in the lines I was drawing and decided that I would use the
letter delta (Δ) since dragging is all about deltas.

<img src="{{ site.baseurl }}/img/ijs-design/1.png"
    style="max-height: 5em; display: block; margin: auto">

I tried a few things including making incomplete, tessellating delta symbols
with both the "a" and "c" but that really wasn't great. Finally, I removed the
dotted line and replaced only the "a" with a regular looking "Δ". I liked this
because it could easily be read as "interact.js" and the Δ was roughly in the
middle.

<img src="{{ site.baseurl }}/img/ijs-design/5.png"
    style="max-height: 5em; display: block; margin: auto">

Next, I adjusted the kerning of all the characters so that the inner triangle
of the Δ was right in the middle. Pleased was I. However, I wouldn't be
satisfied until it was nicely animated.

Animating in Vim
---

I tidied the markup manually and moved the Δ into a `<defs>` element and
referenced it in [`<use>` elements][guide-to-use] then brought the regular text to
the front of the drawing and made it white. The Δs inherit their `fill-color`
from the `<svg>` root element whose `fill-color` is animated from blue to green
to reddish-orange and to blue again.

```xml
<animate id="colors"
    attributeName="fill"
    values="#29e;#29e;#4e4;#4e4;#f40;#f40;#29e;#29e"
    dur="16s"
    repeatCount="indefinite"/>
```

One Δ remains fixed in the middle while the other three have two animations
each – one to change their scale and another to fade in/out.

```xml
<use x="0" y="0" transform="translate(255.81,65.6775)" opacity="0" xlink:href="#a-delta">
     <animateTransform attributeName="transform" 
         attributeType="XML"
         type="scale" 
         values="1; 25"
         dur="10s"
         additive="sum"
         repeatCount="indefinite"/>
     <animate attributeName="opacity"
        values="1; 0"
        dur="10s"
        repeatCount="indefinite"/>
</use>
```

Two of the three animated Δs start at full opacity and fade out while scaling
up from 1 to 25 in 10 seconds and from 0 to 15 in 7 seconds. The other fades in
and then out while scaling down from 15 to 1 in 13 seconds.

The different parameters of the animations and the asymmetry of the Δ result in
a hypnotic, "parallaxy" look which I'm very happy with. On the project
[homepage][ijs], I placed the animated logo in front of a black background so
that the text can be read easily with or without the animation. The animated
logo also sits proudly in the project's [README on Github][gh-readme] with a
white background.


[ijs]: //interactjs.io
[inkscape]: http://inkscape.org
[mdn-smil]: https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL "SVG animation with SMIL"
[guide-to-use]: {{ site.baseurl }}{% post_url 2014-01-04-a-guide-to-svg-use-elements %} "A guide to SVG <use> elements"
[gh-readme]: https://github.com/taye/interact.js#readme
