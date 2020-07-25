const { Mongoose } = require("mongoose");

`use strict`;

const mongoose = require('mongoose');
const schema = mongoose.schema;

const user_schema = new Schema({
    name: String
});