const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1;

const {
    config: {
        AWS_S3_NAME, AWS_S3_REGION, AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY
    }
} = require('../configs');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
    upload: async (file, itemType, itemId) => {
        const { data, name, mimetype } = file;
        const uploadPath = _filePathBuilder(name, itemType, itemId);

        const item = await bucket.upload({
            Bucket: AWS_S3_NAME,
            Body: data,
            Key: uploadPath,
            ContentType: mimetype
        }).promise();

        return item.Location;
    }
};

function _filePathBuilder(fileName, itemType, itemId) {
    const fileExtension = fileName.split('.').pop();

    return path.join(itemType, itemId, `${uuid()}.${fileExtension}`).replace(/\\/g, '/');
}
