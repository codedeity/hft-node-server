'use strict';

const Egg = require('egg');

class CommonService extends Egg.Service {

  constructor(ctx) {
    super(ctx);
    this.root = 'https://fcoin.com/api/v2/public/';
  }

  async request(url, opts) {
    url = `${this.root}${url}`;
    opts = Object.assign({
      timeout: [ '30s', '30s' ],
      dataType: 'json',
    }, opts);
    return this.ctx.curl(url, opts);
  }

  async servertime() {
    const ctx = this.ctx;
    const result = await this.request('server-time', null);
    ctx.status = result.status;
    ctx.set(result.headers);
    return result.data;
  }

}
module.exports = CommonService;
