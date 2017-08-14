var storage = require('@google-cloud/storage');

var fs = require('fs');
var gcs = storage({
	projectId: 'yefei-8e467',
	keyFilename: './config/Yefei-eee182317419.json'
});

var bucket = gcs.bucket('yefei-8e467.appspot.com');
var options = {
	entity: 'allUsers',
	role: gcs.acl.READER_ROLE
};

bucket.acl.add(options, function(err, aclObject){});


module.exports = bucket;