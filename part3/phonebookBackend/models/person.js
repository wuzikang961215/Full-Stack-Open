const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// const url = `mongodb+srv://peterzikangwu:${password}@cluster0.dafgd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;
const url = process.env.MONGODB_URI || 'fallback-connection-string-for-local-development';

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(value) {
        return /^\d{2,3}-\d+$/.test(value) && value.length >= 8;
      },
      message: props => `${props.value} is not a valid phone number! It must have at least 8 characters and follow the format XX-XXXXXXX or XXX-XXXXXXXX.`
    }
  }
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)

// const Person = mongoose.model('Person', personSchema);

// // If only password is provided, list all entries
// if (process.argv.length === 3) {
//   Person.find({}).then((people) => {
//     console.log('phonebook:');
//     people.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close();
//   });
// }

// // If password, name, and number are provided, add a new entry
// if (process.argv.length === 5) {
//   const name = process.argv[3];
//   const number = process.argv[4];

//   const person = new Person({
//     name,
//     number,
//   });

//   person.save().then(() => {
//     console.log(`added ${name} number ${number} to phonebook`);
//     mongoose.connection.close();
//   });
// }
