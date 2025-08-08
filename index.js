import 'dotenv/config';
import express from 'express';
import connectDb from './db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

try {
    await connectDb();
} catch( e ) {
    console.log(e.messsage);
}

const app = express()
const port = 3000 // app port

// how we attach middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// server started here
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});