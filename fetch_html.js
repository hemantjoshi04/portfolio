const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = {
  desktop: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FjYWMxYTViMjQ1NDQ2OTZhMjEwYjIxNDBkYzQ5ODA0EgsSBxDD3rz4wRkYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjYxMjE4NTk3NDQyMjUyMzY0Ng&filename=&opi=89354086',
  mobile: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZmNjhhZDNkNjdhZjRmNjRiOWU1YTUxOWY5YWE2ZGMyEgsSBxDD3rz4wRkYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjYxMjE4NTk3NDQyMjUyMzY0Ng&filename=&opi=89354086'
};

const dir = path.join(__dirname, 'src', 'admin', 'temp');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        resolve();
      });
    }).on('error', reject);
  });
}

Promise.all([
  download(urls.desktop, path.join(dir, 'desktop.html')),
  download(urls.mobile, path.join(dir, 'mobile.html'))
]).then(() => console.log('Done')).catch(console.error);
