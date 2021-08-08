/// 1
/// Editible Div With Memory (localStorage)
/// https://snippet.zone/2021/07/26/editable-div-with-memory-localstorage/

const el = document.createElement('div')
el.innerHTML = localStorage.memory == null ? 'type here' :
  localStorage.memory
el.contentEditable = true;
 
document.body.appendChild(el);
document.addEventListener('keyup', () => {
  localStorage.memory = el.innerHTML;
});