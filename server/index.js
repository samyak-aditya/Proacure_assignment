import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = 'mongodb+srv://Samyak:Cyber10@cluster0.t5hemdi.mongodb.net/?retryWrites=true&w=majority';

// Middleware
app.use(json());
app.use(cors());

// MongoDB Connection
connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define your MongoDB schema and models here using Mongoose


app.use('/',router);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
