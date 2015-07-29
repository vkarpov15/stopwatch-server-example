module.exports = function(Time) {
  Time.beforeRemote('create', function(ctx, modelInstance, next) {
    ctx.args.data.userId = ctx.req.accessToken.userId;
    next();
  });
};
