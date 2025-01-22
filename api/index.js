import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';



mongoose.connect('mongodb+srv://harish99427:UZcAv7X1rZbgqK3g@blog.efv9a.mongodb.net/?retryWrites=true&w=majority&appName=BloG')
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);


app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server Error';
  res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});