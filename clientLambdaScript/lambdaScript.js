//Access AWS Client

setInterval(function updateDynamoDB()
{
  var apigClient = apigClientFactory.newClient({
    accessKey: '',
    secretKey: ''
  });
  
  var params  = {
    // This is where any modeled request parameters should be added.
    // The key is the parameter name, as it is defined in the API in API Gateway.
    userid: '1',
    heartrate: String(Math.round(Math.random()*250))
  };
  
  
  apigClient.heartrateGet(params)
  
  .then(function(result){
    document.getElementById("msg").innerHTML = JSON.stringify(result);
  }).catch( function(result){
    // Add error callback code here.
    document.getElementById("msg").innerHTML = JSON.stringify(result);
  });
}, 5000);