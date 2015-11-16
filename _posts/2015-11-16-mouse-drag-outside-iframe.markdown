---
layout      : post
title       : Receiving mousemove events outside dragged iframe
date        : 2015-11-16 01:15:00
categories  : [tips]
tags        : [mouse, events, preventDefault, iframe]
excerpt     : "Don't call preventDefault on the mousedown event"
published   : true

---

You have an iframe that contains draggable elements. You want dragging of these
elements to continue even if the mouse pointer moves outside the iframe and
over the parent document. You want the dragging to end when the mouse is
released while the pointer is outside the iframe. You could try adding event
listeners to the parent document, but that's not possible when the two
documents have differnt origins. What do you do?

Don't call `preventDefault` on the `mousedown` event.

If the default behaviour isn't prevented on `mousedown`, then when the mouse is
moved outside the iframe and over the parent document, the document in the
iframe will continue to recieve `mousemove` events.
