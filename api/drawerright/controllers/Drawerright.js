'use strict';

/**
 * Drawerright.js controller
 *
 * @description: A set of functions called "actions" for managing `Drawerright`.
 */

module.exports = {

  /**
   * Retrieve drawerright records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.drawerright.search(ctx.query);
    } else {
      return strapi.services.drawerright.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a drawerright record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.drawerright.fetch(ctx.params);
  },

  /**
   * Count drawerright records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.drawerright.count(ctx.query, populate);
  },

  /**
   * Create a/an drawerright record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.drawerright.add(ctx.request.body);
  },

  /**
   * Update a/an drawerright record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.drawerright.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an drawerright record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.drawerright.remove(ctx.params);
  }
};
