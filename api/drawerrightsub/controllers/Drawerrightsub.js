'use strict';

/**
 * Drawerrightsub.js controller
 *
 * @description: A set of functions called "actions" for managing `Drawerrightsub`.
 */

module.exports = {

  /**
   * Retrieve drawerrightsub records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.drawerrightsub.search(ctx.query);
    } else {
      return strapi.services.drawerrightsub.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a drawerrightsub record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.drawerrightsub.fetch(ctx.params);
  },

  /**
   * Count drawerrightsub records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.drawerrightsub.count(ctx.query, populate);
  },

  /**
   * Create a/an drawerrightsub record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.drawerrightsub.add(ctx.request.body);
  },

  /**
   * Update a/an drawerrightsub record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.drawerrightsub.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an drawerrightsub record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.drawerrightsub.remove(ctx.params);
  }
};
