import fs from 'fs';

const readDatabase = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, fileContent) => {
    if (err) {
      reject(err);
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

    resolve(fields);
  });
});

export default readDatabase;
