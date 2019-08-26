import express from 'express';
import '@babel/polyfill';
import cors from "cors";
import userRoutes from './routes/userRoute';
import videoRoutes from './routes/videoRoute';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to KFTV Studio Portfolio',
  });
});

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/videos', videoRoutes);


app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Up and running on ${PORT}`));

export default app;
