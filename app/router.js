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
  app.router.resources('admin', resource_url('admin'), 'admin.admin');
  app.router.resources('topics', resource_url('topics'), 'topics');
  app.router.resources('market', resource_url('market'), 'market');
  app.router.resources('users', resource_url('users'), 'users');
  app.router.resources('system', resource_url('system'), 'system');
  app.router.resources('common', resource_url('common'), 'common');
};
