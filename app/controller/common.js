'use strict';

const Egg = require('egg');

class CommonController extends Egg.Controller {


  async servertime() {
    const ctx = this.ctx;
    const result = await ctx.service.common.servertime();
    ctx.body = result;
  }

}
module.exports = CommonController;
