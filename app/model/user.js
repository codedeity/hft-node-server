'use strict';

const utility = require('utility');

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;


  const User = app.model.define('User', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    age: INTEGER,
    loginname: STRING(30),
    pass: STRING(30),
    email: STRING(30),
    url: STRING(30),
    profile_image_url: STRING(50),
    location: STRING(30),
    signature: STRING(30),
    profile: STRING(30),
    weibo: STRING(50),
    avatar: STRING(30),
    githubId: STRING(30),
    githubUsername: STRING(30),
    githubAccessToken: STRING(30),
    is_block: {
      type: BOOLEAN,
      default: false,
    },
    last_sign_in_at: DATE,
    create_at: DATE,
    update_at: DATE,
    accessToken: STRING(100),
  });


  User.findByLogin = function(login) {
    const somevalue = utility.md5('abc');
    return this.findOne({ where: { login, somevalue } });
  };

  // const getAvatarUrl = () => {
  //   let url = User.avatar || 'https://gravatar.com/avatar/' + utility.md5(User.email.toLowerCase()) + '?size=48';
  //   // www.gravatar.com 被墙
  //   url = url.replace('www.gravatar.com', 'gravatar.com');
  //   // 让协议自适应 protocol，使用 `//` 开头
  //   if (url.indexOf('http:') === 0) { url = url.slice(5); }
  //   // 如果是 github 的头像，则限制大小
  //   if (url.indexOf('githubusercontent') !== -1) { url += '&s=120'; }

  //   return url;
  // };
  // // add avatar_url
  // User.avatar = getAvatarUrl();

  User.update_at = new Date();

  User.associate = function() {
    // app.model.User.hasMany(app.model.stock, { as: 'posts', foreignKey: 'user_id' });
  };

  return User;
};
