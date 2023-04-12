import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number | string = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
  res.json({ msg: 'Server is working.' });
});

import authRoutes from './routes/authRouter';
import fileRoutes from './routes/fileRouter';

app.use('/api/auth', authRoutes)
app.use('/api/file', fileRoutes)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((e: Error) => {
    console.log(e);
  });
