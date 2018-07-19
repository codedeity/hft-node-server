'use strict';

const Egg = require('egg');

class HomeController extends Egg.Controller {
  async index() {
    this.ctx.body = 'hi, HFT Team';
  }
}

module.exports = HomeController;
