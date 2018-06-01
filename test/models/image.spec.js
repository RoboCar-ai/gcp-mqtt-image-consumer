const assert = require('assert');

const {Image} = require('../../app/models/Image_pb');


describe('image serialization tests', () => {
  it('should get name', () => {
    const image = new Image();
    const data = new Uint8Array(Buffer.from("tester", 'utf8'));
    const name = 'test';
    image.setName(name);
    image.setData(data);
    const test = image.serializeBinary();
    console.log(test);

    assert.equal(Image.deserializeBinary(test).getName(), name);
    assert.deepEqual(Image.deserializeBinary(test).getData(), data);
  });

});
