// naive syntax highlighting 
// @TODO:
// - multiline commnet
// - division without spaces ` / `
const breakers = /\.|\s|\;|\,/g,
  words = 'break case catch class continue const constructor debugger default delete do else export extends false finally for from function get if import in instanceof let new null return set super switch symbol this throw true try typeof undefined var void while with yield async await of'.split(
    ' '
  ),
  regWords = words.map(w => new RegExp(`\\b${w}\\b`, 'g')),
  strs = {
    [`'`]: `'`,
    [`"`]: `"`,
    ['`']: '`',
    ['/']: '/'
  };

const tag = (cls, body = '$&', end = '') =>
  `<b class="${cls}">${body}</b>${end}`;

const htmlEntities = str =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function decorate(accum, br = '') {
  for (let i = 0; i < words.length; i++) {
    if (accum.indexOf(words[i]) != -1) {
      accum = accum.replace(regWords[i], `<i>${words[i]}</i>`);
    }
  }

  return accum
    .replace(/(\+|\=|\-|\*|\%|\?|\||\&|\^|!)/g, "<u>$&</u>")
    .replace(/(\W[A-Z].+)/, tag`obj`)
    .replace(/(^[A-Z].+)/, tag`obj`)
    .replace(/([0-9]+?)/g, tag`num`)
    .replace(/(\(|\)|\{|\}|\[|\])/g, tag`par`)
    .replace(/(\.|\,|\;|\:)/g, tag`brk`)
    + br;
}

function highlight(code) {
  let result = '',
    accum = '',
    strAccum = '',
    i,
    j;

  for (i = 0; i < code.length; i++) {
    const char = code[i];
    let startString = strs[char],
      nextChar;

    const parse = (br) => {
      result += decorate(accum, br);
      accum = '';
    };

    if (char.match('\n')) {
      parse()
    }

    if (char === '/' && code[i + 1] === '/') {
      parse();
      strAccum = '';

      j = i;
      nextChar = code[j];

      while (nextChar != null && !nextChar.match(/\n/)) {
        strAccum += nextChar;
        nextChar = code[++j];
      }

      i = j;
      result += tag('cmt', strAccum + '\n');
    } else if (char.match(breakers) && accum.length > 1) {
      parse(char);
    } else if (startString != null) {
      parse();

      if (startString === '/' && code[i + 1] == ' ') {
        result += decorate(char);
        continue;
      }

      j = i + 1;
      strAccum = '';
      nextChar = code[j];

      while (nextChar != null && nextChar != startString) {
        strAccum += nextChar;
        nextChar = code[++j];
      }

      i = j;
      result += tag('str', `${char}${htmlEntities(strAccum)}${char}`);
    } else if (char) {
      accum += char;
    }
  }

  result = result.replace(/([a-zA-Z_$]+)\./g, tag('o', '$1', '.'));

  return `<div class="hh">${result}</div>`;
}
