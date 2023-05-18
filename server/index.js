import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import { dirname ,join} from 'path';
import userRouter from './routes/user.js';

const app = express();

const db = "mongodb+srv://safadmt:QwJPwnC8sPH5WGVc@cluster0.9ekwixw.mongodb.net/crudApp?retryWrites=true&w=majority"

app.use(cors(({origin: 'http://localhost:3000',credentials:true})));

app.use('/images',express.static(join(dirname+'public/images')))
mongoose.connect(db)
.then(()=> console.log("Database connected"))
.catch(err=> console.log(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user', userRouter );

const PORT = 4000 || process.env.PORT
app.listen(PORT, err=> err? console.log(err) : console.log(`Server connected to ${PORT}`));

