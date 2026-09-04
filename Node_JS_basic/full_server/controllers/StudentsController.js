import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const dbPath = process.argv[2];

    return readDatabase(dbPath)
      .then((fields) => {
        const responseText = ['This is the list of our students'];
        const sortedFields = Object.keys(fields).sort((a, b) => (
          a.localeCompare(b, undefined, { sensitivity: 'base' })
        ));

        for (const field of sortedFields) {
          const count = fields[field].length;
          const list = fields[field].join(', ');
          responseText.push(`Number of students in ${field}: ${count}. List: ${list}`);
        }

        return response.status(200).send(responseText.join('\n'));
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    const dbPath = process.argv[2];

    return readDatabase(dbPath)
      .then((fields) => {
        const list = fields[major] ? fields[major].join(', ') : '';
        return response.status(200).send(`List: ${list}`);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }
}

export default StudentsController;
