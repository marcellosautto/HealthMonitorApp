
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "People";

var userID = 1;
var heartRate = Math.random() * 250;

var today = new Date();
//Epic time (add Month date and time)
var timeStamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();



var newHRData = {
    TableName: table,
    Item:{
        "userid": userID,
        "heartrate": heartRate,
        "timestamp": timeStamp
    }
};

async function addEntry(){
    console.log("Adding a new item...");
    try
    {
        await docClient.put(newHRData, function(err, data) 
        {
            console.log("Added item:", JSON.stringify(data, null, 2));
        });
    }
    catch(err)
    {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    }


}

exports.handler = async (event) => {
    try {
      await addEntry()
      return { body: 'Successfully created item!' }
    } catch (err) {
      return { error: err }
    }
  };
