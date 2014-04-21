/*
 * Copyright (c) 2013 Taye Adeyemi
 * Open source under the MIT License.
 * https://raw.github.com/taye/interact.js/master/LICENSE
 */

window.demo = (function () {
    var demo = {
            SnapDemo: SnapDemo
        },
        blue = '#2299ee',
        tango = '#ff4400',
        doneDemos = [];

    window.demos = window.demos || [];

    function $ (root, selector) {
        if (!selector) {
            selector = root;
            root = document;
        }
        return root.querySelector(selector);
    }

    CanvasRenderingContext2D.prototype.circle = function (x, y, radius, color) {
        this.fillStyle = color || this.fillStyle;
        this.beginPath();
        this.arc(x, y, radius, 0, 2*Math.PI);

        return this;
    };

    function SnapDemo (options) {
        var that = this;

        this.pathCanvas = $(options.pathCanvas);

        this.pathContext = this.pathCanvas.getContext('2d');
        this.dragCanvas = $(options.dragCanvas);

        this.dragCanvas.width = this.pathCanvas.width = options.width || this.pathCanvas.width;
        this.dragCanvas.height = this.pathCanvas.height = options.height || this.pathCanvas.height;

        this.pathContext.strokeStyle = blue;
        this.pathContext.lineWidth   = 4;
        this.pathContext.lineJoin    = 'round';
        this.pathContext.lineCap     = 'round';

        this.dragContext = this.dragCanvas.getContext('2d');
        this.dragContext.fillStyle = tango;
        this.dragContext.circle(8, 75, 8).fill();

        this.path = options.path;
        this.drawInterval = options.drawInterval || 4;
        this.drawPath(this.drawInterval);

        interact(this.dragCanvas)
            .styleCursor(false)
            .snap({
                mode: 'path',
                paths: [ this.path ]
            })
            .draggable(true)
            .on('dragstart', function (event) {
                event.target.style.setProperty('cursor', '-moz-grabbing', '!important');
                event.target.style.setProperty('cursor', '-webkit-grabbing', '!important');
                document.documentElement.style.setProperty('cursor', '-moz-grabbing', '!important');
                document.documentElement.style.setProperty('cursor', '-webkit-grabbing', '!important');
            })
            .on('dragend', function (event) {
                event.target.style.cursor = '';
                document.documentElement.style.cursor = '';
            })
            .on('dragmove', function (event) {
                that.dragmove(event);
            })
            .origin('self');
    }

    SnapDemo.prototype = {
        drawPath: function (interval) {
            interval = interval && interval > 0? interval|0: this.drawInterval;

            var x = 0,
                context = this.pathContext,
                width = this.pathCanvas.width,
                target;

            context.beginPath();

            if (typeof this.path === 'function') {
                target = this.path(x, 0);
            }
            else {
                target = this.path;
            }
            context.moveTo(typeof target.x === 'number'? target.x: x,
                           typeof target.y === 'number'? target.y: 0);

            for (x = interval; x < width; x += interval) {
                if (typeof this.path === 'function') {
                    target = this.path(x, 0);
                }
                else {
                    target = this.path;
                }
                context.lineTo(typeof target.x === 'number'? target.x: x,
                               typeof target.y === 'number'? target.y: 0);
            }

            context.stroke();
        },
        dragmove: function (event) {
            var context = this.dragContext;

            context.clearRect(0,0, context.canvas.width, context.canvas.height);
            context.circle(event.pageX, event.pageY, 8).fill();
        }
    };

    interact(document).on('DOMContentLoaded', function () {
        window.demos.forEach(function (parameters) {
            doneDemos.push(new SnapDemo(parameters));
        });
    });


    return demo;
}());
