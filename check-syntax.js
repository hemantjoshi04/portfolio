const fs = require('fs');
const parser = require('@babel/parser');

try {
  const code = fs.readFileSync('src/pages/Home.jsx', 'utf-8');
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log('Successfully parsed!');
} catch (e) {
  console.error(e);
}
