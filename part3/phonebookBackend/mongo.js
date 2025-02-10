const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage: node mongo.js <password> [<name> <number>]');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://peterzikangwu:${password}@cluster0.dafgd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// If only password is provided, list all entries
if (process.argv.length === 3) {
  Person.find({}).then((people) => {
    console.log('phonebook:');
    people.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// If password, name, and number are provided, add a new entry
if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
