'use strict';

module.exports = () => {

  return async function blockUser(ctx, next) {
    if (ctx.path === '/signout') {
      await next();
      return;
    }

    if (ctx.user && ctx.user.is_block && ctx.method !== 'GET') {
      ctx.status = 403;
      ctx.body = '您已被列入黑名单。有疑问请站内联系 @admin。';
      return;
    }

    await next();
  };
};
