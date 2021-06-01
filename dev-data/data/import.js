const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require(`${__dirname}/../../models/tourModel.js`)

dotenv.config({ path: `${__dirname}/../../config.env`});

const db =
  process.env.DATABASE_URL.replace('<PASSWORD>', process.env.USER_PASSWORD) ||
  process.env.DATABASE_LOCAL;

const connect = async () => {
  await mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('Database Connected');
    });
  process.exit();
};

const read = async () => {
  const seeds = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
  try {
    for (let tour of seeds) {
      await Tour.create(tour);
    }
    console.log('successfully seeded!');
  } catch (err) {
    console.log('failed to seed');
    console.log(err);
  }
  process.exit();
};

const del = async () => {
  try {
    await Tour.deleteMany();
    console.log('successfully deleted');
  } catch (err) {
    console.log('failed to delete');
    console.log(err);
  }
  process.exit();
};

connect();

if (process.argv[2] === '--import') {
  read();
} else if (process.argv[2] === '--delete') {
  del();
}

