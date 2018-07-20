'use strict';

const Egg = require('egg');

class UserController extends Egg.Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      accesstoken: 'string',
      title: 'string',
      tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
      content: 'string',
    };

    this.userRegisterRule = {
      username: 'string',
      password: 'string',
      gender: { type: 'enum', value: [ 'male,female' ], required: false },
      mobile: { type: 'string', required: false },
      mail: { type: 'string', required: false },
    };

  }

  async show() {
    const { ctx } = this;

    ctx.body = await ctx.service.topics.show({
      id: ctx.params.id,
      mdrender: ctx.query.mdrender !== 'false',
      accesstoken: ctx.query.accesstoken || '',
    });
  }

  async index() {
    const { ctx } = this;

    ctx.validate({
      page: { type: 'string', format: /\d+/, required: false },
      tab: { type: 'enum', values: [ 'ask', 'share', 'job', 'good' ], required: false },
      limit: { type: 'string', format: /\d+/, required: false },
    }, ctx.query);

    ctx.body = await ctx.service.topics.list({
      page: ctx.query.page,
      tab: ctx.query.tab,
      limit: ctx.query.limit,
      mdrender: ctx.query.mdrender !== 'false',
    });
  }

  // 不可以这么写
  // async reg() {
  //   const { ctx } = this;
  //   // 校验用户注册信息符合格式
  //   ctx.validate(this.userRegisterRule);
  //   // 回复信息给Web Client
  //   ctx.body = await ctx.service.user.save({
  //     id: ctx.params.id,
  //     mdrender: ctx.query.mdrender !== 'false',
  //     accesstoken: ctx.query.accesstoken || '',
  //   });
  //   ctx.status = 201;
  // }

  async new() {
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

  async create() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    // 校验用户注册信息符合格式
    ctx.validate(this.userRegisterRule);

    // 回复信息给Web Client
    ctx.body = await ctx.service.user.save({
      id: ctx.params.id,
      mdrender: ctx.query.mdrender !== 'false',
      accesstoken: ctx.query.accesstoken || '',
    });

    const id = await ctx.service.topics.create(ctx.request.body);
    ctx.body = {
      topic_id: id,
    };
    ctx.status = 201;
  }

  async update() {
    const { ctx } = this;
    const id = ctx.params.id;

    ctx.validate(this.createRule);
    await ctx.service.topics.update(Object.assign({ id }, ctx.request.body));
    ctx.status = 204;
  }
}

module.exports = UserController;
