const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const apiRoute = require('./Routes/base-api')



db_uri = `mongodb://techcloude_qa:W0eitlawB5w1FLA4@cluster0-shard-00-00.erpom.mongodb.net:27017,cluster0-shard-00-01.erpom.mongodb.net:27017,cluster0-shard-00-02.erpom.mongodb.net:27017/amezbookstore?ssl=true&replicaSet=atlas-7bgebv-shard-0&authSource=admin&retryWrites=true&w=majority`
const port = process.env.PORT || 8089

app.use(bodyParser.json());
const corsList = { 
   // origin: ["*", "http://localhost:4200", "http://localhost:4201", "52.219.156.188"]
   origin: "*"
};
app.use(cors(corsList));


app.listen(port, ()=> {
    console.log("Server Started on : " + port);
    mongoose.connect(db_uri, (err)=>{
        if(!err) {
            console.log("DB Connected");
        } else {
            console.log("Connection Error" + ' - ' + err);
        }
    }); 
});

app.use("/api", apiRoute)







