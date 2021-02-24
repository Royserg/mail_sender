"use strict";
exports.__esModule = true;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entities/User");
var connectionOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User_1.User],
    synchronize: true,
    logging: true
};
typeorm_1.createConnection(connectionOptions)
    .then(function () {
    console.log('Connected to database');
})["catch"](console.error);
