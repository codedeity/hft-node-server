'use strict';

const Egg = require('egg');

class CommonController extends Egg.Controller {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://fcoin.com/api/v2';
  }
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.common.index();
  }

}
module.exports = CommonController;
