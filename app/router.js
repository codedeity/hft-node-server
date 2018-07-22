'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const api_prefix = '/api/v2/';
  const apiV1Router = app.router.namespace(api_prefix);
  const { router, controller, middleware } = app;

  const resource_url = url => {
    return api_prefix + url;
  };

  const tokenRequired = middleware.tokenRequired();

  //  COMMON USING
  router.get('/', controller.home.index);
  router.post('/api/v2/users/register', controller.users.register);
  apiV1Router.get('/user/:loginname', controller.users.show);
  apiV1Router.post('/accesstoken', tokenRequired, controller.users.verify);

  // REST API ROUTE MOUNT
  router.resources('admin', resource_url('admin'), controller.admin.admin);
  router.resources('topics', resource_url('topics'), controller.topics);
  router.resources('market', resource_url('market'), controller.market);
  router.resources('users', resource_url('users'), controller.users);
  router.resources('system', resource_url('system'), controller.system);
  router.resources('common', resource_url('common'), controller.common);
};
