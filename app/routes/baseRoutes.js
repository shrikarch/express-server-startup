var ntlm = require('request-ntlm-continued');
var simpleNtlm = require('request-simple-ntlm');

module.exports = function (app) {
  app.get('/urlSpec/:searchTerm', function(req, res){
    console.log(req.params.searchTerm);
    var options = {
      username: "ram.burugu",
      password: "oliveN@il17",
      ntlm_domain: "IPGNA",
      workstation: "",
      // url: "https://learningcenterdev.interpublic.com/gm/PerformSearch?SO=rel&object=1.54.1&format=EU_SearchXML.shtml&mode=EU&illegals=&O1=any&MH=2000&visibletext="+ req.params.searchTerm +"&P1=" + req.params.searchTerm + "&showXML=true"
      url: "https://170.200.166.231/gm/PerformSearch?SO=rel&object=1.54.1&format=EU_SearchXML.shtml&mode=EU&illegals=&O1=any&MH=2000&visibletext=ZINVR&P1=ZINVR&showXML=true"
    };
    simpleNtlm.fetch(options, function (err, response, body){
      if(err) return console.warn(err);
      console.log("Responded");
      res.send(body);
    });

  })
};
