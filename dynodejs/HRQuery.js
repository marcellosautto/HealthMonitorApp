//Query DynamoDB table to return all data stored
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for all user heart rates.");

var params = {
    TableName : "People",
    KeyConditionExpression: "#id = :userid",
    ExpressionAttributeNames:{
        "#id": "userid"
    },
    ExpressionAttributeValues: {
        ":userid": 1
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.userid + ": HR- " + item.heartrate + ": Time- " + item.timestamp);
        });
    }
});
