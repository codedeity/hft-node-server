'use strict';

const Egg = require('egg');

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

  // register
  async signup() {
    const { ctx } = this;
    // 校验用户注册信息符合格式
    ctx.validate(this.userRegisterRule);
    // 回复信息给Web Client
    ctx.body = await ctx.service.user.save({
      id: ctx.params.id,
      mdrender: ctx.query.mdrender !== 'false',
      accesstoken: ctx.query.accesstoken || '',
    });
    ctx.status = 201;
  }

  // login
  async signin() {
    const { ctx } = this;
    // 校验用户注册信息符合格式
    ctx.validate(this.userRegisterRule);
    // 回复信息给Web Client
    ctx.body = await ctx.service.user.save({
      id: ctx.params.id,
      mdrender: ctx.query.mdrender !== 'false',
      accesstoken: ctx.query.accesstoken || '',
    });
    ctx.status = 201;
  }

  // logout
  async signout() {
    const { ctx } = this;
    // 校验用户注册信息符合格式
    ctx.validate(this.userRegisterRule);
    // 回复信息给Web Client
    ctx.body = await ctx.service.user.save({
      id: ctx.params.id,
      mdrender: ctx.query.mdrender !== 'false',
      accesstoken: ctx.query.accesstoken || '',
    });
    ctx.status = 201;
  }

}

module.exports = SignController;
