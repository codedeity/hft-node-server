'use strict';

const Egg = require('egg');
const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');

class SignController extends Egg.Controller {
  constructor(ctx) {
    super(ctx);

    this.userRegisterRule = {
      username: 'string',
      password: 'string',
      gender: { type: 'enum', value: [ 'male,female' ], required: false },
      mobile: { type: 'string', required: false },
      mail: { type: 'string', required: false },
    };

  }

  async signup() {
    const { ctx, service, config } = this;
    const loginname = validator.trim(ctx.request.body.loginname || '').toLowerCase();
    const mobile = validator.trim(ctx.request.body.mobile || '');
    const email = validator.trim(ctx.request.body.email || '').toLowerCase();
    const pass = validator.trim(ctx.request.body.pass || '');
    const rePass = validator.trim(ctx.request.body.re_pass || '');

    let msg;
    // 验证信息的正确性
    if ([ loginname, pass, rePass, email ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    } else if (loginname.length < 5) {
      msg = '用户名至少需要5个字符。';
    } else if (!ctx.helper.validateId(loginname)) {
      msg = '用户名不合法。';
    } else if (!validator.isEmail(email)) {
      msg = '邮箱不合法。';
    } else if (pass !== rePass) {
      msg = '两次密码输入不一致。';
    }
    // END 验证信息的正确性

    if (msg) {
      ctx.status = 422;
      ctx.body = {
        error: msg,
        loginname,
        email,
      };
      return;
    }

    const users = await service.users.getUsersByQuery({ $or: [
      { loginname },
      { email },
      { mobile },
    ] }, {});

    if (users.length > 0) {
      ctx.status = 422;
      await ctx.render('sign/signup', {
        error: '手机号码或邮箱已被使用。',
        loginname,
        email,
      });
      return;
    }

    const passhash = ctx.helper.bhash(pass);

    // create gravatar
    const avatarUrl = service.users.makeGravatar(email);

    await service.users.newAndSave(loginname, loginname, passhash, email, avatarUrl, false);
    ctx.body = { success: 'Welcome! ' + config.name };
  }

  async signout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.logout();
    ctx.redirect('/');
  }

  async activeAccount() {
    const { ctx, service, config } = this;
    const key = validator.trim(ctx.query.key || '');
    const name = validator.trim(ctx.query.name || '');

    const user = await service.users.getUserByLoginName(name);
    if (!user) {
      await ctx.render('notify/notify', { error: '用户不存在' });
      return;
    }

    const passhash = user.pass;
    if (!user || utility.md5(user.email + passhash + config.session_secret) !== key) {
      await ctx.render('notify/notify', { error: '信息有误，帐号无法被激活。' });
      return;
    }

    if (user.active) {
      await ctx.render('notify/notify', { error: '帐号已经是激活状态。' });
      return;
    }

    user.active = true;
    await user.save();
    await ctx.render('notify/notify', { success: '帐号已被激活，请登录' });
  }

  async showSearchPass() {
    await this.ctx.render('sign/search_pass');
  }

  async updateSearchPass() {
    const { ctx, service } = this;
    const email = validator.trim(ctx.request.body.email).toLowerCase();
    if (!validator.isEmail(email)) {
      await this.ctx.render('sign/search_pass', {
        error: '邮箱不合法',
        email,
      });
      return;
    }

    // 动态生成retrive_key和timestamp到users collection,之后重置密码进行验证
    const retrieveKey = uuid.v4();
    const retrieveTime = Date.now();

    const user = await service.users.getUserByMail(email);
    if (!user) {
      await this.ctx.render('sign/search_pass', {
        error: '没有这个电子邮箱。',
        email,
      });
      return;
    }

    user.retrieve_key = retrieveKey;
    user.retrieve_time = retrieveTime;
    await user.save();

    // 发送重置密码邮件
    // mail.sendResetPassMail(email, retrieveKey, user.loginname);
    await this.ctx.render('notify/notify', {
      success: '我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。',
    });
  }

  async resetPass() {
    const { ctx, service } = this;
    const key = validator.trim(ctx.query.key || '');
    const name = validator.trim(ctx.query.name || '');

    const user = await service.users.getUserByNameAndKey(name, key);
    if (!user) {
      ctx.status = 403;
      await this.ctx.render('notify/notify', {
        error: '信息有误，密码无法重置。',
      });
      return;
    }

    const now = Date.now();
    const oneDay = 1000 * 60 * 60 * 24;
    if (!user.retrieve_time || now - user.retrieve_time > oneDay) {
      ctx.status = 403;
      await this.ctx.render('notify/notify', {
        error: '该链接已过期，请重新申请。',
      });
      return;
    }
    await this.ctx.render('sign/reset', { name, key });
  }

  async updatePass() {
    const { ctx, service } = this;
    const psw = validator.trim(ctx.request.body.psw) || '';
    const repsw = validator.trim(ctx.request.body.repsw) || '';
    const key = validator.trim(ctx.request.body.key) || '';
    const name = validator.trim(ctx.request.body.name) || '';

    if (psw !== repsw) {
      await this.ctx.render('sign/reset', {
        name,
        key,
        error: '两次密码输入不一致。',
      });
      return;
    }
    const user = await service.users.getUserByNameAndKey(name, key);

    if (!user) {
      await this.ctx.render('notify/notify', {
        error: '错误的激活链接',
      });
      return;
    }
    const passhash = ctx.helper.bhash(psw);
    user.pass = passhash;
    user.retrieve_key = null;
    user.retrieve_time = null;
    user.active = true; // 用户激活

    await user.save();
    await this.ctx.render('notify/notify', { success: '你的密码已重置。' });
  }

  async verify() {
    const { ctx } = this;
    const user = ctx.request.user;
    ctx.body = {
      success: true,
      loginname: user.loginname,
      id: user._id,
      avatar_url: user.avatar_url,
    };
  }

}

module.exports = SignController;
