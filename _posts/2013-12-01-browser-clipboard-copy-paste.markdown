---
layout      : post
title       : "How to control what is copy-pasted to/from the clipboard in Chrome, Firefox and Safari"
date        : 2013-12-02 01:09:57
categories  : [user-interaction]
tags        : [clipboard, override, copy, paste, javascript]
excerpt     : 
scripts     : [underscore]
published   : true

---

<style type="text/css">
#rc-target {
    z-index : 9003;
    width   : 100px;
    height  : 100px;
    margin  : -50px;  /* so it's positioned at it's centre */
    opacity : 0.6;
    border  : none;
    padding : 0;

    position: absolute;
    left    : -1000px;
    right   : -1000px;
}

#demo-space {
    width: 90%;
    padding: 5%;
    background-color: #2299ee;

    font-family: sans-serif;
    font-size: 40px;
    line-height: 1.4;
    color: white;
}
</style>

You can control what the browser copies and pastes when a user uses keyboard
shortcuts or the right-click context menu by getting in between the default
sequence of events and changing focus to an element of your choice so that by
the time the user input sequence is complete, it will be targeting the element
and content you choose.

## Handling keyboard shortcuts (Ctrl+C / Ctrl+V)
1. Add an event listener to the document for `keydown` events

    ```javascript
    document.addEventListener('keydown', function (event) {
    ```
2. In this event listener, check if the [V] key is pressed while [Ctrl] is held
   down (the paste shortcut).

   ```javascript
        if (event.keyCode === 86 && event.ctrlKey) {
    ```
3. If that is true, set focus to an input element so that a `paste` event is
   fired.

   ```javascript
            document.getElementByid('paste-target').focus();
        }
    ```
4. Otherwise check if [Ctrl] and [C] or [X] were pressed (copy or cut).

    ```javascript
        else if (event.keyCode === 67 || event.keyCode === 88) {
    ```
5. If true, set focus to an input element and select the containted text. It is
   this text that will be sent to the clipboard.

    ```javascript
            var copyTarget = document.getElementByid('copy-target');

            copyTarget.focus();
            copyTarget.select();
        }
    });
    ```
<br>

## Handling right-click context menu cut/copy/paste

Taking control of the context of the context menu is a little more tricky. The
context-menu is shown at the end of a right-click and the context is of the
element that the mouse was over. By placing an element below the mouse between
the `mousedown` and `mouseup` events, you can set the context to be that of any
clickable element.

If this element is invisible then it does not interrupt the user's workflow.

1. Style the right click target element so that it is invisible and placed
   off-screen.

   ```css
    #rc-target {
        z-index : 9003;
        width   : 100px;
        height  : 100px;
        margin  : -50px;  /* so it's positioned at it's centre */
        opacity : 0;
        border  : none;
        padding : 0;

        position: absolute;
        left    : -1000px;
        right   : -1000px;
    }
    ```
2. Add a `mousedown` event listener to the `document` that checks for right-clicks

    ```javascript
    document.addEventListener('mousedown' function (event) {
        if (event.button === 2) {
    ```
3. If the button is the right mouse button, move the input element to the
   coordinates of the event

   ```javascript
            var rcTarget = document.getElementByid('rc-target');

            rcTarget.style.left = event.pageX;
            rcTarget.style.top  = event.pageY;
    ```
4. Then bring focus to the element and select the text inside it and prevent
   the default event behaviour

   ```javascript
            rcTarget.focus();
            rcTarget.select();

            event.preventDefault();
        }
    });
    ```
5. Hide the `#rc-target` element on `mousemove`

    ```javascript
    document.addEventListener('mousemove', function (event) {
        var rcTarget = document.getElementById('rc-target');

        rcTarget.style.left = rcTarget.style.top = '';
    });
    ```

After mouseup, the context menu will be displayed for the `#rc-target` element.
If the user clicks cut/copy/paste, it will relate to the text within the
element.

This way, you can have the user copy and paste data from anywhere in your web
page/app.

<div id="demo-space">
    Try right-clicking here to see how this works
</div>
<input id="rc-target" type="text">

<script>
// an input element which the paste/copy will target
var rcTarget = document.getElementById('rc-target'),
    demoSpace = document.getElementById('demo-space'),
    index = 0;

rcTarget.value = 'text inside textbox';

demoSpace.onmousedown = function (event) {
    // if it's a right-click
    if (event.button === 2) {
        // change the value of the input element
        rcTarget.value = ['Apples', 'Mele', 'Pommes', 'úlla'][(index++) % 4];
        // focus and position the input element to be below the cursor
        rcTarget.style.left = event.pageX + 'px';
        rcTarget.style.top  = event.pageY + 'px';

        rcTarget.focus();
        rcTarget.select();

        event.preventDefault();
    }
    // When the mouse goes up, the browser context menu is shown for the input element
    // and the user can copy/paste the input element text using the browser UI
}
</script>
