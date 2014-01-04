---
layout      : post
date        : 2014-01-04 9:55:40
title       : A guide to SVG &lt;use&gt; elements
permalink   : /svg/a-guide-to-svg-use-elements
categories  : [SVG]
tags        : [SVG, use, use element, xlink, 'xlink:href', namespaces, javascript, graphics]
excerpt     : "SVG &lt;use&gt; elements allow you to duplicate and re-use graphical SVG elements including &lt;g&gt;, &lt;svg&gt; and &lt;symbol&gt; elements as well as other &lt;use&gt; elements. With them, you can craft SVG documents with a DRY kind of approach."
scripts     : [demo-html]
published   : true

---

<style>
svg {
    width: 100%;
    height: 150px;
    background-color: rgba(34, 153, 238, 0.2);
}
svg use {
    pointer-events: none;
}
</style>

SVG [`<use>`][mdn-svg-use-element] elements allow you to duplicate and re-use graphical SVG elements
including `<g>`, `<svg>` and `<symbol>` elements as well as other `<use>`
elements.  With them, you can craft SVG documents with a
[DRY][dont-repeat-yourself] kind of approach.

Below is an example of simple SVG in an HTML document. When written inline in
HTML5, there is no need to specify the svg namespace
`xmlns="http://www.w3.org/2000/svg"` or xlink namespace
`xmlns:xlink="http://www.w3.org/1999/xlink"` attributes.

```xml
<!-- enable javascript to view a demo -->
<svg viewBox="0 0 400 100">
    <rect
        x="100" y="20"
        width="50" height="50"
        fill="#29e" />
    <rect
        x="250" y="30"
        width="50" height="50"
        fill="#29e" />
</svg>
```

Apart from the x/y attributes the two `<rect>`s are identical. So instead of
repeating code, we can write out only one of the `<rect>`s and duplicate it
with a `<use>` element which has a different position.

To do this, we must:

 - give the first `<rect>` an ID then we
 - replace the second with a `<use>` and
 - give it an `xlink:href` attribute with a value of `"#[reference element
   ID]"`.
   
The result is two identical elements in the exact same position. To change the
position of a `<use>` element, we can use the `x` and `y` attributes or the
`transform` attribute.

```xml
<!-- enable javascript to view a demo -->
<svg viewBox="0 0 400 100">
    <rect id="original-rect"
        x="100" y="20"
        width="50" height="50"
        fill="#29e" />

    <use xlink:href="#original-rect" x="150" y="10" />
        <!-- x/y of the <use> element
             are added to x/y of the referenced <rect> -->
</svg>
```
The resulting image is identical to that of the previous example, but requires less
code.

## Improvements
The reference would be much more convenient to use if it's center were always
at the coordinates of it's duplicates so that if you wanted a rectange centered
at `(200, 50)` you would simply write:

```xml
<use xlink:href="#original-rect" x="200" y="50" />
<!-- or -->
<use xlink:href="#original-rect" transform="translate(200 50)" />
<!-- using `transform` to position the element
     makes combining animations a lot easier -->
```

We can do this by moving the reference element into a `<defs>` element and
positioning it so that it center is at `(0, 0)`. All elements in `<defs>`
elements are not rendered unless they are referenced by another visible
element.

```xml
<!-- enable javascript to view a demo -->
<svg viewBox="0 0 400 100">
    <!-- list resourses in a <defs> element -->
    <defs>
        <rect id="def-rect"
            x="-25" y="-25"
            width="50" height="50"
            fill="#29e" />
    </defs>

    <!-- reference resourses by ID in xlink:href attribute -->
    <use xlink:href="#def-rect" transform="translate(100 50)"/>
    <use xlink:href="#def-rect" transform="translate(200 50)"/>
    <use xlink:href="#def-rect" transform="translate(300 50)"/>
</svg>
```

## Property Inheritance
If a property like `fill`, `stroke`, `stroke-width`, etc. isn't specidied in
the original element, then it can be inherited from the `<use>` element as if
it were a `<g>`. For example, we can't change the fill color of elements using
`#def-rect` by setting `fill` of the `<use>` element (since the attribute is
already set in the reference element) but we can set the stroke style since
that wasn't set in `#def-rect`.

```xml
<!-- enable javascript to view a demo -->
<svg viewBox="0 0 400 100">
    <use xlink:href="#def-rect" transform="translate(100 50)"
        fill="red"
        stroke="black"/>
    <use xlink:href="#def-rect" transform="translate(200 50)"
        fill="red"
        stroke="black" stroke-width="8"/>
    <use xlink:href="#def-rect" transform="translate(300 50)"
        fill="red"
        stroke="black" stroke-width="8" stroke-linejoin="round"/>
</svg>
```

## Animations
Animations that are applied to the reference element are also observed in the
duplicates. (Note that SMIL animations are not supported by Internet Explorer.)

```xml
<!-- enable javascript to view a demo -->
<svg viewBox="0 0 400 100">
    <defs>
        <rect id="anim-rect"
            x="-25" y="-25"
            width="50" height="50"
            fill="#29e" >
            
            <animate
                attributeName="fill"
                values="#29e; #4e4; #f40; #29e"
                dur="6s"
                repeatCount="indefinite" />
        </rect>
    </defs>

    <use xlink:href="#anim-rect" transform="translate(100 50)"/>
    <use xlink:href="#anim-rect" transform="translate(200 50)"/>
    <use xlink:href="#anim-rect" transform="translate(300 50)"/>
</svg>
```

Animations can also be added to each `<use>` element.

```xml
<!-- enable javascript to view a demo -->
<svg viewBox="0 0 400 100">
    <use xlink:href="#anim-rect" transform="translate(100 50)">
        <animateTransform
            attributeName="transform" type="rotate"
            values="0 0 0; 360 0 0"
            additive="sum"
            dur="6s"
            repeatCount="indefinite" /> </use>

    <use xlink:href="#anim-rect" transform="translate(200 50)">
        <animateTransform
            attributeName="transform" type="scale"
            values="0.5; 1.5; 0.5"
            additive="sum"
            dur="3s"
            repeatCount="indefinite" /> </use>

    <use xlink:href="#anim-rect" transform="translate(300 50)">
        <animateTransform
            attributeName="transform" type="translate"
            values="-12.5 -12.5;
                     12.5 -12.5;
                     12.5  12.5;
                    -12.5  12.5;
                    -12.5 -12.5"
            additive="sum"
            dur="3s"
            repeatCount="indefinite" /> </use>
</svg>
```

## Dynamic `<use>` with javscript

To create a `<use>` element with javascript, as with any SVGElement, we use
[`document.createElementNS`][mdn-create-element-ns] which takes an xml
namespace URI and element nodeName strings.

```javascript
var useElement =
    document.createElementNS('http://www.w3.org/2000/svg', 'use');

document.querySelector('svg').appendChild(useElement);
```

To set the `xlink:href` attribute, we use [`Element.setAttributeNS`][mdn-set-attribute-ns] which takes
the namespace, the attribute name and the attribute value. In this
case, the namespace is `xlink` the URI of which is
`http://www.w3.org/1999/xlink`.

```javascript
useElement.setAttributeNS(
        'http://www.w3.org/1999/xlink', // xlink NS URI
        'href',                         // attribute (no 'xlink:')
        '#anim-rect');                  // value to set
```

[dont-repeat-yourself]:  http://en.wikipedia.org/wiki/Don't_repeat_yourself "Don't Repeat Yourself"
[mdn-create-element-ns]: https://developer.mozilla.org/en-US/docs/Web/API/document.createElementNS "document.createElementNS - Web API Interfaces | MDN"
[mdn-set-attribute-ns]:  https://developer.mozilla.org/en-US/docs/Web/API/Element.setAttributeNS "Element.setAttributeNS - Web API Interfaces | MDN"
[mdn-svg-use-element]:   https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use "use - SVG | MDN"
