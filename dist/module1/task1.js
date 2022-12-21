"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_process_1 = __importDefault(require("node:process"));
var revertString = function (data) {
    return data.split("").reverse().join("");
};
node_process_1.default.stdin.on("data", function (data) {
    node_process_1.default.stdout.write("--> ");
    node_process_1.default.stdout.write(revertString(data.toString()));
    node_process_1.default.stdout.write("\n");
});
