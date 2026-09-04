const http = require('http');
const fs = require('fs');

const databaseName = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, fileContent) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = fileContent
        .split('\n')
        .filter((line) => line.trim() !== '');

      const students = lines.slice(1);
      const fields = {};

      students.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });

      const output = [];
      output.push(`Number of students: ${students.length}`);

      Object.keys(fields).forEach((field) => {
        const names = fields[field];
        output.push(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      });

      resolve(output.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(databaseName)
      .then((report) => {
        res.end(`This is the list of our students\n${report}`);
      })
      .catch((err) => {
        res.end(`This is the list of our students\n${err.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

app.listen(1245);

module.exports = app;