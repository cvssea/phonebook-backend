/* eslint-disable no-case-declarations */
const mongoose = require('mongoose');

const handleArgErr = () => {
  console.log(
    `
    Usage:
    node mongo.js <password> - Get all entries
    node mongo.js <password> <name> <number> - Add new entry
    node mongo.js <password> id=<id> - Delete entry by id
    `,
  );
  process.exit(1);
};

if (process.argv.length < 3) {
  handleArgErr();
}

const password = process.argv[2];
const cluster = process.env.CLUSTER;

const url = `mongodb+srv://cvsea:${password}@${cluster}.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

switch (process.argv.length) {
  // add person
  case 5:
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });

    person.save().then((result) => {
      const { name, number } = result;

      console.log(`Added ${name} number ${number} to phonebook!`);
      mongoose.connection.close();
    });
    break;
  // get all people
  case 3:
    Person.find({}).then((result) => {
      console.log('Phonebook:');
      result.forEach((p) => {
        const { name, number } = p;
        console.log(`${name} ${number}`);
      });
      mongoose.connection.close();
    });
    break;
  // delete person
  case 4:
    if (process.argv[3].includes('id=')) {
      const id = process.argv[3].replace('id=', '');
      Person.deleteOne({ _id: id })
        .then((result) => {
          if (!result.deletedCount) {
            throw { message: 'no such id in database' };
          }
          console.log(`Deleted entry with id ${id} from phonebook`);
          mongoose.connection.close();
        })
        .catch((e) => {
          console.log('Error:', e.message);
          mongoose.connection.close();
        });
    } else {
      handleArgErr();
    }
    break;
  default:
    handleArgErr();
    break;
}
