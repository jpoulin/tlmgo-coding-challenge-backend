// Import config file
require('dotenv').config()

// Initialize required packages 
let express = require("express")
let mongoose = require('mongoose')
let app = express()

// Accept JSON payloads
app.use(express.json());

// Listen to the specified port
app.listen(process.env.APP_PORT, () => {
    sendLog("Server has started")
})

// MongoDB connection
mongoose
	.connect(process.env.MONGO_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
        sendLog("Connection to database established")
	})
    .catch(err => {
        sendLog("Cannot connect to database (err)", true)
        process.exit();
      });

// Send message for default URL
app.get('/', (req, res) => res.status(400).json({ message: "Endpoint is not valid", timestamp: Date.now() }));

const ninjifyRouter = require("./routes/ninjify");
app.use("/ninjify", ninjifyRouter);

function sendLog(msg, isError = false){
    // Format timestamp
    let timestampFormat = new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '')

    // Send msg based on type (error or not)
    if (isError){
        console.log("/!\\ " + timestampFormat + " - " + msg)
    }
    else{
        console.log(timestampFormat + " - " + msg)
    }
}