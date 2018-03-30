module.exports = function (app) {

  app.get('/irwin/contact/', function(req, res){
    console.log('irwin/contact');
    var objective = req.query.object;

    if(objective == "TimeSupervisor"){
      var userID = req.query.user;
      if(userID == "ram.burugu@interpublic.com"){
        res.json({
          "fullName" : "John Doe",
          "email" : "john.doe@interpublic.com",
          "phone" : "919-982-8765",
          "object" : objective,
          "user" : userID
        })
      }else if(userID.includes("@interpublic.com")){
        res.json({
          "fullName" : "Tom Martin",
          "email" : "tom.martin@interpublic.com",
          "phone" : "919-982-8765",
          "object" : objective,
          "user" : userID
        })
      }else{
        res.json({
          "info" : "error",
          "message" : "User not present in the active directory"
        });
      };
    }
  });

  app.get('/irwin/validator/', function(req, res){
    console.log('irwin/validator');
    var objective = req.query.object;

    if(objective == 'job'){
      var jbn = req.query.jbn;
      performJBNCheck(jbn, req, res);
    }else if( objective == 'activity'){
      var jbn = req.query.jbn;
      var act = req.query.act;
      performActivityCheck(jbn, act, req, res);
    }else if(objective == "role"){
      var userID = req.query.user;
      performRoleCheck(userID, req, res);
    }else if(objective == "time"){
      var userID = req.query.user;
      performTimeCheck(userID, req, res);
    }else if(objective == "blocking"){
      var userID = req.query.user;
      performBlockCheck(userID, req, res);
    }
  });

};



function performJBNCheck(jbn, req, res){
  if(!jbn.includes('JBN')){
    res.json({
      "status" : "error",
      "reason" : "incorrect job number",
      "response" : "You appear to have entered a job number - "+ jbn +" that does not exist. Please check the number for any typos and try again, if the issue persists please reach out to the Job Owner - <job owner> to confirm the correct job number"
    });
  }else{
    if(jbn.includes('NLV')){
      res.json({
        "status" : "error",
        "reason" : "validity expired",
        "response" : "The Job Number "+ jbn +" is not longer valid, please reach out to the Job Owner - <job owner> to confirm the correct job number"
      });
    }else{
      if(jbn.includes('ATE')){
        res.json({
          "status" : "error",
          "reason" : "invalid status",
          "response" : "The job you are trying to use does not have  a status that allows time to be posted to it. Please contact the job owner/finance contact of the job to have the job status updated or to provide you a new job number to post your time against. For additional details on Job Status functionality please visit the Job Statuses document in the Vantage Learning Center."
        });
      }else{
        if(jbn.includes('PLANT')){
          res.json({
            "status" : "error",
            "reason" : "invalid plant",
            "response" : "The job  you are trying to use has not been opened in the plant you are assigned to. Resolution options. \n\n - Reach out to your local office HR admin (copied)  to provide you cross plant access to the plant you are entering time (by maintaining you in the ZEMPCC table). \n\n - Reach out to finance contact on the job if they want to open a segment on the job  for the plant you belong to. \n\n - Find  a different job no. that belongs to your  plant to enter time with help of your finance/supervisor/time super use."
          });
        }else{
          res.json({
            "status" : "success",
            "reason" : "job numver checked",
            "response" : "The job number is perfectly valid"
          });
        }
      }
    }
  }
}

function performActivityCheck(jbn, act, req, res){
  //Math.round(Math.random()*1)
  if(act.length < 3 || act.length > 3){
    res.json({
      "status" : "error",
      "reason" : "invalid Time Off activity code",
      "response" : "You are using a Time Off job which needs a 3 digit activity code. Please select a valid 3 digit code and try again.   For additional information on entering time and Activity Codes for Time Off please visit our Vantage Learning Center."
    });
  }else{
    if(act.includes("NM")){
      res.json({
        "status" : "error",
        "reason" : "agency customer master list not maintained",
        "response" : "You are using a Time Off job which needs a 3 digit activity code. Please select a valid 3 digit code and try again.   For additional information on entering time and Activity Codes for Time Off please visit our Vantage Learning Center."
      });
    }else{
      res.json({
        "status" : "success",
        "reason" : "No failures",
        "response" : "Activity code is perfectly valid."
      });
    }
  }
}

function performRoleCheck(userID, req, res){
  var random = Math.round(Math.random()*3);
  if(random == 0){
    res.json({
      "status" : "error",
      "reason" : "Time Entry Role not matched",
      // "statusCode" : "TENM", //changed for demo
      "statusCode" : "CVRNM",
      "response" : "We have updated your account with the correct time entry role <role name> , please try your time entry again."
    });
  }else if(random == 1){
    res.json({
      "status" : "error",
      "reason" : "CVR parameter does not match",
      "statusCode" : "CVRNM",
      "response" : "You do not have the correct role assigned, I will notify the Support team to add the role. You will very soon hear from them once the role setup is complete."
    });
  }else{
    res.json({
      "status" : "error",
      "reason" : "incorrect CVR",
      // "statusCode" : "INCCVR", //changed for demo
      "statusCode" : "CVRNM",
      "response" : "We have updated your account with the correct time entry parameters please try your time entry again.  For additional information on Time Entry please see the Vantage Learning Center Time Management Folder."
    });
  }
}

function performTimeCheck(userID, req, res){
  var random = Math.round(Math.random()*10);
  if(random < 11){
    res.json({
      "status" : "error",
      "reason" : "missing time",
      "response" : "01/02/2018 , 01/11/2018 and 01/12/2018"
    });
  }else{
    res.json({
      "status" : "success",
      "reason" : "No failures",
      "response" : "I cannot find any issues with time within the system. I have created a ticket for you and escalated to the help desk for action. You will hear very soon from them once the parameters have been setup."
    });
  }
}

function performBlockCheck(userID, req, res){
  if(userID.includes("CNE")){
    res.json({
      "status" : "error",
      "reason" : "Company Not Existent",
      "response" : ""
    });
  }else if(userID.includes("TSR")){
    res.json({
      "status" : "error",
      "reason" : "Time Sheets Required",
      "response" : ""
    });
  }else{
    res.json({
      "status" : "success",
      "reason" : "No failures",
      "response" : ""
    });
  }
}
