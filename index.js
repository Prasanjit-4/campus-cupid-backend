import express from 'express';
// import connectDatbase from './database/db.js';
import { router } from './routes/users.js';
import 'dotenv/config';


const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/users', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});