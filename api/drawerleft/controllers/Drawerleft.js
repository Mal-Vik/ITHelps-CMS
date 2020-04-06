'use strict';

/**
 * Drawerleft.js controller
 *
 * @description: A set of functions called "actions" for managing `Drawerleft`.
 */

module.exports = {

  /**
   * Retrieve drawerleft records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.drawerleft.search(ctx.query);
    } else {
      return strapi.services.drawerleft.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a drawerleft record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.drawerleft.fetch(ctx.params);
  },

  /**
   * Count drawerleft records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.drawerleft.count(ctx.query, populate);
  },

  /**
   * Create a/an drawerleft record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.drawerleft.add(ctx.request.body);
  },

  /**
   * Update a/an drawerleft record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.drawerleft.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an drawerleft record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.drawerleft.remove(ctx.params);
  }
};
