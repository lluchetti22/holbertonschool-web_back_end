const fs = require('fs');

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

      console.log(`Number of students: ${students.length}`);

      Object.keys(fields).forEach((field) => {
        const names = fields[field];
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      });

      resolve();
    });
  });
}

module.exports = countStudents;
