'use strict';
const fs = require('fs');

class ServerlessWhitesourcePlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {	
	  'after:deploy:deploy': this.afterDeploy.bind(this)
    };
  }
  
  afterDeploy() {    
	var names = '';
	this.serverless.service.getAllFunctions().forEach((functionName) => {		
		const functionObj = this.serverless.service.getFunction(functionName);
		names+=functionObj.name+'\r\n';
		});
		fs.writeFile("functionNames.txt", names, function(err) {
			if(err) {
				console.log(err);
				return err;
			}
			console.log("The names file was saved!");
			fs.appendFile('whitesource-fs-agent_serverless.config', 'serverless.includes=functionNames.txt', function(err){
				if (err) {
					console.log(err);
					return err;
				}
				console.log('config file updated');
			});
		});
    }  
}

module.exports = ServerlessWhitesourcePlugin;
