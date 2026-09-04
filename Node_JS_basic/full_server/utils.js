import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject(new Error('Cannot load the database'));
      return;
    }
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.trim().split(/\r?\n/);
      const students = lines.slice(1).filter((line) => line.trim() !== '');
      const fields = {};

      for (const student of students) {
        const [firstname, , , field] = student.split(',');
        if (firstname && field) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
        }
      }
      resolve(fields);
    });
  });
};

export default readDatabase;
