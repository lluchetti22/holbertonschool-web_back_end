import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const lines = data.trim().split('\n');
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
