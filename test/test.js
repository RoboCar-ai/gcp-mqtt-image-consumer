const storage = require('@google-cloud/storage')();

const bucket = storage.bucket('sacred-reality-201417-mlengine');

const filePath = 'sessions/donkey.json';

const file = bucket.file(filePath);

file.download().then(data => console.log(JSON.parse(data.toString('utf8')))).catch(console.log);