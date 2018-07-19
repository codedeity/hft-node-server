'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  // router.get('/', controller.home.index);
  const api_prefix = '/api/v2/';
  const resource_url = url => {
    return api_prefix + url;
  };

  app.router.resources('topic', resource_url('topic'), 'topic');
  app.router.resources('market', resource_url('market'), 'market');
  app.router.resources('user', resource_url('user'), 'user');
  app.router.resources('system', resource_url('system'), 'system');
  app.router.resources('stock', resource_url('stock'), 'stock');
};
