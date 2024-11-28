const express=require("express")
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); 
let {app}= require("./app.js")

connectDB();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
