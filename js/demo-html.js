document.addEventListener('DOMContentLoaded', window.demoHTML = function (event) {
    var codeBlocks = document.querySelectorAll('code.xml, code.html, code[data-lang=xml], code[data-lang="html"]'),
        demoFlag = window.demoFlag || /<!-- enable javascript to view a demo -->/;

        codeBlocks = Array.prototype.filter.call(codeBlocks, function (element) {
            return demoFlag.test(element.firstChild.textContent);
        });

    codeBlocks.forEach(function (element) {
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
});
