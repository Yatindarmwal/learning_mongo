`use strict`;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user_test');

mongoose.connection
    .once('open', () => console.log('GTG'))
    .on('error', (error) => {
        console.warn('Error', Error);
    });
