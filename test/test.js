const storage = require('@google-cloud/storage')();

const bucket = storage.bucket('sacred-reality-201417-mlengine');

const filePath = 'sessions/donkey.json';

const file = bucket.file(filePath);

file.download()
.then(data => {
    const sess = JSON.parse(data.toString('utf8'));
    console.log(sess);
    // sess.status = 'active'
    // return file.save(JSON.stringify(sess));
})
.catch(console.log);