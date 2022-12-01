const fs = require('fs');
const csv = require('csvtojson');
const { pipeline } = require('node:stream')

const filePath = './assets/nodejs-hw1-ex1.csv';
const readStream = fs.createReadStream(filePath, {
    highWaterMark: 15
});
const writeStream = fs.createWriteStream('./assets/nodejs-hw1-ex1.txt');
readStream.pipe(csv()).pipe(writeStream).on("error", (err) => {
    console.log(err);
});

// second method

pipeline(
    fs.createReadStream('./assets/nodejs-hw1-ex1.csv', {
        highWaterMark: 15
    }),
    csv({ ignoreEmpty: true }).subscribe((data) => {
        delete data['Amount'];
        if ( !!(data['Price']) ) {
            data['Price'] = Number(data['Price']);
        }
    }),
    fs.createWriteStream('./assets/nodejs-hw1-ex2.txt', ),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    },
);
