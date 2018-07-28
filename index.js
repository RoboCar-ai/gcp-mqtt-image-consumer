/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
const storage = require('@google-cloud/storage')();
const {Image} = require('./app/models/image_pb');

exports.subscribe = (event, callback) => {
  // The Cloud Pub/Sub Message object.
  const pubsubMessage = event.data;
  console.log(pubsubMessage.data);
  const b = Buffer.from(pubsubMessage.data, 'base64');
  const image = Image.deserializeBinary(Array.from(b));
  const name = image.getName();
  const imageData = image.getData();
  const telemetry = {
    mode: image.getTelemetry().getMode(),
    steeringAngle: image.getTelemetry().getSteeringAngle(),
    throttle: image.getTelemetry().getThrottle(),
    imageId: image.getTelemetry().getImageId()
  };
  // We're just going to log the message to prove that
  // it worked.
  // console.log(Buffer.from(pubsubMessage.data, 'base64').toString());
  // callback();
  // Don't forget to call the callback.
  console.log(telemetry);
  console.log(`file name ${name}`);
  const bucket = storage.bucket('sacred-reality-201417-mlengine');
  
  bucket.file('sessions/donkey.json').download().then(session => {
    const sessionData = JSON.parse(session.toString('utf8')).name;

    const basePath = `data/${sessionData.name}-${sessionData.count}`;
    const file = bucket.file(`${basePath}/${name}`);
    return file.save(imageData);
  })
  .then(_ => bucket.file(`${basePath}/${telemetry.imageId}.json`).save(JSON.stringify(telemetry)))
  .then(_ => callback()).catch(callback);
};
