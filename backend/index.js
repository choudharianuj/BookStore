const express = require('express')
const mongoose = require('mongoose');
const {PORT, MongoURL} = require ("./config")
const app = express()
const cors = require('cors')
const router = require('./routes/booksRoute');

app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));
app.use(express.json());

app.get('/', (req, res)=>{
    console.log(req)
    res.send(`welcome to MERN stack project`);
});

app.use('/books', router);


mongoose.connect(MongoURL).then(()=>{
    console.log(`database is connected sucessfully`);

    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
      })

}).catch((err)=>{
    console.log(err);
})
