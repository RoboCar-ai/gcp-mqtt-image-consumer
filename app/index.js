/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
const storage = require('@google-cloud/storage')();
const {Image} = require('./models/Image_pb');

exports.subscribe = (event, callback) => {
  // The Cloud Pub/Sub Message object.
  const pubsubMessage = event.data;

  const image = Image.deserializeBinary(pubsubMessage);
  const name = image.getName();
  const data = image.getData();
  // We're just going to log the message to prove that
  // it worked.
  // console.log(Buffer.from(pubsubMessage.data, 'base64').toString());
  // callback();
  // Don't forget to call the callback.
  const file = storage.bucket('sacred-reality-201417-mlengine').file(`data/${name}`);
  file.save(data).then(_ => callback()).catch(callback);
};
