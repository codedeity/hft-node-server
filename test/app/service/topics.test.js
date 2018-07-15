'use strict';
const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/topics.test.js', () => {
  let ctx;

  beforeEach(() => {
    // 创建一个匿名的 context 对象，可以在 ctx 对象上调用 service 的方法
    ctx = app.mockContext();
  });

  describe('create()', () => {
    it('should create failed by accesstoken error', async () => {
      try {
        await ctx.service.topics.create({
          accesstoken: 'hello',
          title: 'title',
          content: 'content',
        });
      } catch (err) {
        assert(err.status === 401);
        assert(err.message === '错误的accessToken');
        return;
      }
      throw 'should not run here';
    });

    it('should create success', async () => {
      // 不影响 CNode 的正常运行，我们可以将对 CNode 的调用按照接口约定模拟掉
      // app.mockHttpclient 方法可以便捷的对应用发起的 http 请求进行模拟
      app.mockHttpclient(`${ctx.service.topics.root}/topics`, 'POST', {
        data: {
          success: true,
          topic_id: '5433d5e4e737cbe96dcef312',
        },
      });

      const id = await ctx.service.topics.create({
        accesstoken: 'hello',
        title: 'title',
        content: 'content',
      });
      assert(id === '5433d5e4e737cbe96dcef312');
    });
  });
});
