import express from 'express';
import '@babel/polyfill';
import cors from 'cors';
import bodyparser from 'body-parser';
import users from './routes/user';
import videos from './routes/video';
import enquiries from './routes/enquiries';

const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to KFTV Studio Portfolio',
  });
});

app.use('/api/v1/auth', users);
app.use('/api/v1/videos', videos);
app.use('/api/v1/enquiries', enquiries);


app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Up and running on ${PORT}`));

export default app;
