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
        tango = '#ff4400';

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
        var that = this,
            rect;

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
        this.drawPath(options.drawInterval);

        this.resetOrigin();

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
            });
    }

    SnapDemo.prototype = {
        drawPath: function (interval) {
            interval = interval && interval > 0? interval|0: this.drawInterval;

            var x = 0,
                context = this.pathContext,
                width = this.pathCanvas.width,
                len = width / interval;

            context.beginPath();
            if (typeof this.path === 'function') {
                context.moveTo(x, this.path(x, 0).y);
            }
            else {
                context.moveTo(x, this.path.y);
            }

            for (x = interval; x < width; x += interval) {
                if (typeof this.path === 'function') {
                    context.lineTo(x, this.path(x, 0).y);
                }
                else {
                    context.lineTo(x, this.path.y);
                }
            }

            context.stroke();
        },
        dragmove: function (event) {
            var context = this.dragContext;

            context.clearRect(0,0, context.canvas.width, context.canvas.height);
            context.circle(event.pageX, event.pageY, 8).fill();
        },
        resetOrigin: function () {
            var rect = interact(this.dragCanvas).getRect();

            interact(this.dragCanvas)
                .origin({ x: rect.left, y: rect.top });
        }
    };

    interact(document).on('DOMContentLoaded', function (event) {
        var siteWidth = parseInt(window.getComputedStyle($('div.site')).width, 10);

        demo.sin = new SnapDemo({
            pathCanvas: '#sin-path',
            dragCanvas: '#sin-drag',
            width: siteWidth,
            path: function (x, y) {
                return {
                    y: (75 + 50 * Math.sin(x * 0.04)),
                    range: Infinity
                };
            }
        });
        demo.line = new SnapDemo({
            pathCanvas: '#line-path',
            dragCanvas: '#line-drag',
            width: siteWidth,
            path: {
                y: 75,
                range: Infinity
            }
        });

        interact(window).on('resize', _.debounce(function (event) {
            demo.sin.resetOrigin();
            demo.sin.drawPath();
            demo.line.resetOrigin();
            demo.line.drawPath();
        }), 500);

    });

    return demo;
}());
