'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const api_v2_prefix = '/api/v2/';
  const { router, controller, middleware, passport } = app;
  const apiV2Router = router.namespace(api_v2_prefix);

  const path_url = url => {
    return api_v2_prefix + url;
  };

  const tokenRequired = middleware.tokenRequired();

  // user register/login/logout
  apiV2Router.post(path_url('sign/up'), controller.sign.signup);

  apiV2Router.post(path_url('sign/in'), passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
  }));

  apiV2Router.post(path_url('sign/out'), controller.sign.signout);

  apiV2Router.post('/accesstoken', tokenRequired, controller.users.verify);

  // REST API ROUTE MOUNT
  router.resources('users', path_url('users'), controller.users);
  router.resources('admin', path_url('admin'), controller.admin.admin);
  router.resources('topics', path_url('topics'), controller.topics);
  router.resources('market', path_url('market'), controller.market);
  router.resources('system', path_url('system'), controller.system);
  router.resources('common', path_url('common'), controller.common);
};
