import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js'



mongoose.connect('mongodb+srv://harish99427:UZcAv7X1rZbgqK3g@blog.efv9a.mongodb.net/?retryWrites=true&w=majority&appName=BloG')
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();
app.use(express.json())


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute)