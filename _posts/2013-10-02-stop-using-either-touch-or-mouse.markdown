---
layout      : post
title       : Hey web-devs, stop listening for EITHER touch or mouse events!
date        : 2013-10-02 18:56:10
categories  : [user-interaction]
tags        : [rant, touchscreen, touch, mouse, javascript, HTML5, events]
excerpt     : "Seriously. It's annoying. Some devices have a touchscreen and mouse/trackpad."
published   : true

---

Seriously. It's annoying. Some devices have a touchscreen *and* mouse/trackpad.
When you do somehting like

```javascript
if ('createTouch' in document) {
    element.addEventListener('touchstart', clickListener);
}
else {
    element.addEventListener('click', clickListener);
}
```

I start disliking you. It's nothing personal, but you've just forced me to use the
touchscreen of my laptop to interact with your website even if I prefer to use
the trackpad or a connected mouse.

When I made the prototype for interact.js, I was guilty of doing
[the same thing][known-problem]. However, I knew it was the wrong way to go about
supporting touch events and I [eventually fixed][touch-and-mouse-commit] it.

[known-problem]: https://github.com/taye/interact.js/blob/8e6a7e8/interact.js#L15-25
[touch-and-mouse-commit]: https://github.com/taye/interact.js/commit/62efd5b
