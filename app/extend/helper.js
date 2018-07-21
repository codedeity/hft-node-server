'use strict';

// const MarkdownIt = require('markdown-it');
// const validator = require('validator');
// const jsxss = require('xss');
const moment = require('moment');
const bcrypt = require('bcryptjs');

moment.locale('zh-cn'); // 使用中文

exports.staticFile = function(filePath) {
  if (filePath.indexOf('http') === 0 || filePath.indexOf('//') === 0) {
    return filePath;
  }
  return this.app.config.site_static_host + filePath;
};

exports.tabName = function(tab) {
  const pair = this.app.config.tabs.find(pair => {
    return pair[0] === tab;
  });
  if (pair) {
    return pair[1];
  }
};

exports.proxy = function(url) {
  return url;
  // 当 google 和 github 封锁严重时，则需要通过服务器代理访问它们的静态资源
  // return '/agent?url=' + encodeURIComponent(url);
};

exports.ago = function(date) {
  date = moment(date);

  return date.fromNow();
};

exports.validateId = str => {
  return /^[a-zA-Z0-9\-_]+$/i.test(str);
};

exports.bhash = str => {
  return bcrypt.hashSync(str, 10);
};

exports.bcompare = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};
