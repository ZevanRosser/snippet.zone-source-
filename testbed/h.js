const breakers = /\.|\s|\;|\,/g,
  words = 'break case catch class continue const constructor debugger default delete do else export extends false finally for from function get if import in instanceof let new null return set super switch symbol this throw true try typeof undefined var void while with yield async await of'.split(' ')
strs = {
  [`'`]: `'`,
  [`"`]: `"`,
  ["`"]: "`"
}

function htmlEntities(str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function decorate(accum, br = '') {
  accum = accum.replace(/[^a-zA-Z0-9\s]/g, "<u>$&</u>");

  for (let i = 0; i < words.length; i++) {
    if (accum.indexOf(words[i]) != -1) {
      // @TODO premake these exps
      accum = accum.replace(new RegExp("\\b" + words[i] + "\\b", "g"), `<i>${words[i]}</i>`);
    }
  }

  accum = accum.replace(/(\W[A-Z].+)/, "<b class='obj'>$1</b>")
        .replace(/(^[A-Z].+)/, "<b class='obj'>$1</b>")
         .replace(/([0-9]+?)/g, "<b class='num'>$1</b>")
         .replace(/(\(|\)|\{|\})/g, "<b class='par'>$1</b>")
         .replace(/(\.|\,|\;|\:)/g, "<b class='brk'>$1</b>");

  return accum + br;
}

function highlight(code) {
  let result = '',
      accum = '',
      strAccum = '',
      i, j;

  for (i = 0; i < code.length; i++) {
    const char = code[i];
    let nextChar;
    let prevChar;
    let startString = strs[char];

    if (char.match('\n')) {
      result += decorate(accum);
      accum = '';
    }

    if (char === '/' && code[i + 1] === '/') {
      result += decorate(accum);
      accum = '';
      strAccum = '';
      j = i;

      nextChar = code[j];
      while (nextChar != null && !nextChar.match(/\n/)) {
        // @TODO escape \
        strAccum += nextChar;
        nextChar = code[++j];
      }

      i = j;

      result += `<b class="cmt">${strAccum}\n</b>`;
    } else if (char.match(breakers) && accum.length > 1) {

      result += decorate(accum, char);
      accum = '';

    } else if (startString != null) {
      result += decorate(accum);
      accum = '';

      j = i + 1;
      strAccum = '';
      nextChar = code[j];

      while (nextChar != null && nextChar != startString) {
        // @TODO escape
        strAccum += nextChar;
        nextChar = code[++j];
      }

      i = j;
      result += `<b class="str">${char}${htmlEntities(strAccum)}${char}</b>`;
    } else if (char) {
      accum += char;
    }

    prevChar = char;
  }

  result = result.replace(/[a-zA-Z_$]+\./g, "<b class='o'>$&</b>");

  return `<div class="hh">${result}</div>`;
}
