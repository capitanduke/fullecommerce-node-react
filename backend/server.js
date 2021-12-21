import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import uploadRouter from './routes/uploadRouter';
import path from 'path';


var express = require('express');

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use('/api/uploads', uploadRouter);

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.use('/api/orders', orderRoute);

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

/*app.get('/', (req, res) => {
    res.send('Serve is ready');
});*/

app.use((err, req, res, next) => {
    res.status(500).send({message: err,message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
