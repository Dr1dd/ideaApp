const back = require('androidjs').back;
const fs = require('fs');
const path = require('path');


back.on('save-data', function(filepath, msg){
	fs.writeFile(path.join(filepath, 'data.txt'), msg, function(err){
		if(err) throw err;
		console.log('file saved')
	})
})

back.on('get-data', function(filepath){
	fs.readFile(path.join(filepath, 'data.txt'), 'utf-8', function(err, data){
		if(err) back.send('get-data-result', 'error');
		else back.send('get-data-result', data);
	})
})