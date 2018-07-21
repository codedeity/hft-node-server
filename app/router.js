'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller } = app;

  const api_prefix = '/api/v2/';
  const resource_url = url => {
    return api_prefix + url;
  };


  //  COMMON USING
  router.get('/', controller.home.index);
  app.router.post(resource_url('users/register'), controller.users.register);

  // REST API ROUTE MOUNT
  app.router.resources('admin', resource_url('admin'), controller.admin.admin);
  app.router.resources('topics', resource_url('topics'), controller.topics);
  app.router.resources('market', resource_url('market'), controller.market);
  app.router.resources('users', resource_url('users'), controller.users);
  app.router.resources('system', resource_url('system'), controller.system);
  app.router.resources('common', resource_url('common'), controller.common);
};
