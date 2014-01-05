document.addEventListener('DOMContentLoaded', window._liveDemo = function (event) {
    var xmlCodeBlocks = document.querySelectorAll('code.xml, code.html, code[data-lang=xml], code[data-lang=html]'),
        jsCodeBlocks  = document.querySelectorAll('code.javascript, code[data-lang=javascript]'),
        demoHTMLFlag  = window.demoHTMLFlag || /^<!--.*enable javascript.*-->/,
        demoJSFlag    = window.demoJSFlag || /^\/\/.*enable javascript.*|\/\*.*enable javascript.*\*\//;

    // get <code> elements with comments that match the flag
    xmlCodeBlocks = Array.prototype.filter.call(xmlCodeBlocks, function (element) {
        return demoHTMLFlag.test(element.firstChild.textContent);
    });

    xmlCodeBlocks.forEach(function (element) {
        // remove flag comment
        element.removeChild(element.firstChild);

        // remove leading blank line
        if (element.childNodes[0].nodeValue === '\n') {
            element.removeChild(element.childNodes[0]);
        }

        // insert code as HTML after the syntax highlight element
        // code -> pre -> div.highlight
        element.parentNode.parentNode.insertAdjacentHTML('afterend', element.textContent);
    });

    // get <code> elements with comments that match the flag
    jsCodeBlocks = Array.prototype.filter.call(jsCodeBlocks, function (element) {
        return demoJSFlag.test(element.firstChild.textContent);
    });

    jsCodeBlocks.forEach(function (element) {
        // remove flag comment
        element.removeChild(element.firstChild);

        // remove leading blank line
        if (element.childNodes[0].nodeValue === '\n') {
            element.removeChild(element.childNodes[0]);
        }

        // eval code
        eval(element.textContent);
    });
});
