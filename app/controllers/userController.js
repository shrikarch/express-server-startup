const logger = require('../_log/logger_def.js');
const crypto = require('crypto');
const mongoose = require('mongoose');
const _ = require('lodash');

exports.list = function(req, res){
  res.send("list all users")
}

exports.create = function(req, res){
  res.send("create a user")
}
