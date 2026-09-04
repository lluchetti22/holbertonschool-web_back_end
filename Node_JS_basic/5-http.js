const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const students = lines.slice(1);
      const fields = {};

      students.forEach((student) => {
        const parts = student.split(',');
        const firstname = parts[0];
        const field = parts[3];

        if (firstname && field) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
        }
      });

      const totalStudents = Object.values(fields).reduce(
        (sum, list) => sum + list.length,
        0
      );

      const responseParts = [`Number of students: ${totalStudents}`];
      for (const [field, names] of Object.entries(fields)) {
        responseParts.push(
          `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`
        );
      }

      resolve(responseParts.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const database = process.argv[2];

    countStudents(database)
      .then((data) => {
        res.end(`This is the list of our students\n${data}`);
      })
      .catch((err) => {
        res.end(`This is the list of our students\n${err.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
