//create dynamoDB table
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var tableParams = {
    TableName : table,
    KeySchema: [       
        { AttributeName: "userid", KeyType: "HASH"},
    ],
    AttributeDefinitions: [       
        { AttributeName: "userid", AttributeType: "N" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(tableParams, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
