const fs = require('fs');

fs.readdir('files', (err, files) => {
  let list = '';
  files.forEach(file => {
    const txt = fs.readFileSync('files/'+file, 'utf-8');
    const parse = txt.split(/\/\/\//);
    //console.log(parse, parse.length);
    if (parse.length > 0) {
      list += `<li data-file="${file}">${parse[2].trim()}</li>\n`;
    }
  });
  const template = fs.readFileSync('index-tmpl.html', 'utf-8');
  const parts = template.split('<!--.{([*])}.-->');

  fs.writeFileSync('index.html', parts[0] + list + parts[1]);
  
  console.log('<!--.{([*])}.--> GENERATED')
});