const express = require('express');
const dotenv = require('dotenv');
// const db = require('./config/db')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')



dotenv.config()


const app = express();

// app.use(cors({
//     origin: ['https://dadn.000webhostapp.com/', 'http://localhost:3000'],
//     credentials: true,
//   }));
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
))

const port = process.env.PORT || 3001;

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect DB success')
    })
    .catch((err) => {
        console.log('Connect DB error')
    })

app.get('/', (req, res) => {
    res.send('Hello World! 1 2 3');
})



app.use(bodyParser.json())
routes(app);



app.listen(port, () => {
    console.log('Server listening on port', + port);
});
