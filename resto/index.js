const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./route')
const ejs = require('ejs');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = 4000;


app.use(express.static('public'));
app.use(express.static(__dirname))
app.set('view engine', 'ejs')
//app.use(cors())

app.use(bodyParser.urlencoded({extended:true}));  // to support encoded bodies
app.use(bodyParser.json());
app.use(cors());
//app.use(' /posts', postsRoutes);
//app.use(' /img', uploadRoutes);
app.use(routes);
app.listen(PORT, ()=>{
    console.log(`Server started and listening on port ${PORT}`);
})

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to DB');
});
