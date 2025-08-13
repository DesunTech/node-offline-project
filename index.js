import 'dotenv/config';
import connectDb from './db.js';

try {
    await connectDb();
} catch( e ) {
    console.log(e.messsage);
}

import express from 'express';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express()
const port = 3000 // app port

// how we attach middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);

// server started here
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});