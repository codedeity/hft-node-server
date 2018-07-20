'use strict';

const Egg = require('egg');

class CommonService extends Egg.Service {

  constructor(ctx) {
    super(ctx);
    this.root = 'https://fcoin.com/api/v2';
  }

  async request(url, opts) {
    url = `${this.root}${url}`;
    opts = Object.assign({
      timeout: [ '30s', '30s' ],
      dataType: 'json',
    }, opts);
    return this.ctx.curl(url, opts);
  }

  async index() {
    // const result = await this.request('public/server-time', null);
    // this.checkSuccess(result);
    const result = await this.ctx.curl('https://api.fcoin.com/v2/public/server-time');
    return result.data;
  }

  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}
module.exports = CommonService;
