import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import router from './routes/routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.mongo_url

app.use(json());
app.use(cors());


connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));




app.use('/',router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
