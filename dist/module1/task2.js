"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var node_stream_1 = require("node:stream");
var csvtojson_1 = __importDefault(require("csvtojson"));
// first way with output in nodejs-hw1-ex1.txt
var filePath = './assets/nodejs-hw1-ex1.csv';
var readStream = fs_1.default.createReadStream(filePath, {
    highWaterMark: 15
});
var writeStream = fs_1.default.createWriteStream('./assets/nodejs-hw1-ex1.txt');
readStream.pipe((0, csvtojson_1.default)()).pipe(writeStream).on("error", function (err) {
    console.log(err);
});
// second way with output in nodejs-hw1-ex2.txt
(0, node_stream_1.pipeline)(fs_1.default.createReadStream('./assets/nodejs-hw1-ex1.csv', {
    highWaterMark: 15
}), (0, csvtojson_1.default)({ ignoreEmpty: true }).subscribe(function (data) {
    delete data['Amount'];
    if (!!(data['Price'])) {
        data['Price'] = Number(data['Price']);
    }
}), fs_1.default.createWriteStream('./assets/nodejs-hw1-ex2.txt'), function (err) {
    if (err) {
        console.error('Pipeline failed.', err);
    }
    else {
        console.log('Pipeline succeeded.');
    }
});
