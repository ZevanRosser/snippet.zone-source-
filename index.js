import { h } from './testbed/h.js';
// grab all the elements
const el = {};
const els = {};

console.log(window.highlight);

const elements = document.querySelectorAll('*');

console.log(elements.length,
  ';;;;;;')

for (let i = 0; i < elements.length; i++) {
  const elem = elements[i];
  const classes = elem.classList;
  for (let j = 0; j < classes.length; j++) {
    const name = classes[j];
    if (els[name] == null) {
      el[name] = elem;
      els[name] = [elem];
    } else {
      els[name].push(elem);
    }
  }
}
 
let margin = 0,
  head = () => '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>micro tester<\/title><style> body,html {margin: ' + margin + ';padding: 0;height: 100%;overflow: hidden;}<\/style><\/head><body><script>',
  foot = '<\/script><\/body><\/html>';

function showOverlay(snippetUrl) {
  console.log(snippetUrl);
  el.codeOverlay.style.display = 'block'
  fetch('files/' + snippetUrl)
    .then(r => r.text())
    .then(code => {
      console.log(code);
     // el.
      el.readableCode.innerHTML = h(code);
      el.codeFrame.srcdoc = head() + code + foot;
    });
}
document.addEventListener('mousedown', e => {
  const el = e.target;
  if (el.matches('[data-url]')) {
    showOverlay(el.dataset.url);
  }
})