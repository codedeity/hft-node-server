'use strict';

const status = [ 404, 403 ];

module.exports = (option, app) => {
  return async function(ctx, next) {

    await next();

    if ((status.indexOf(ctx.status) > -1) && !ctx.body) {
      const { message } = ctx;
      ctx.status = ctx.status;
      if (ctx.acceptJSON && app.config.env === 'prod') {
        ctx.body = { error: 'Not Found' };
      } else {
        await ctx.render('notify/notify', { error: message });
      }
    }


  };
};
