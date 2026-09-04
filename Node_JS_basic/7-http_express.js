const express = require('express');
const fs = require('fs');

const databaseName = process.argv[2];

const app = express();

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

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(databaseName)
    .then((report) => {
      res.send(`This is the list of our students\n${report}`);
    })
    .catch((err) => {
      res.send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(1245);

module.exports = app;
