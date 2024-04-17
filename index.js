const express = require('express')
const PORT = 3003;
const path = require('path');
const cors = require('cors');
const router = require('./routes/index.js');
const mongoose = require('mongoose');
const uri = "mongodb+srv://mAdmin:nzt123@ediploma.fbzcewr.mongodb.net/?retryWrites=true&w=majority&appName=ediploma";



const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api', router);


// client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// })

const start = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        app.listen(PORT, () => {
            console.log('Server run on:', PORT, 'port')
        })
    } catch (e) {
        console.error(e)
    }
}

start().catch(e => console.error(e))