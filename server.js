const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8000;
const db =
  process.env.DATABASE_URL.replace('<PASSWORD>', process.env.USER_PASSWORD) ||
  process.env.DATABASE_LOCAL;                                

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) 
  .then(() => {
    console.log('Database Connected');
  });

app.listen(port, (req, res) => {
  console.log(`listening at port ${port}`);
});
