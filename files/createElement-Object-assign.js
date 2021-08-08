/// 0
/// createElement and Object.assign
/// https://snippet.zone/2021/07/25/createelement-and-object-assign/

const el = document.createElement('div');
Object.assign(el.style, {
  position: 'absolute',
  left: '100px',
  top: '100px',
  width: '30px',
  height: '30px',
  background: 'linear-gradient(black, red)',
  transform: 'rotate(15deg)'
});
document.body.appendChild(el);