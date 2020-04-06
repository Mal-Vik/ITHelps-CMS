/* global Drawerleft */
'use strict';

/**
 * Drawerleft.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

// Strapi utilities.
const utils = require('strapi-hook-bookshelf/lib/utils/');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');


module.exports = {

  /**
   * Promise to fetch all drawerlefts.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    // Select field to populate.
    const withRelated = populate || Drawerleft.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const filters = convertRestQueryParams(params);

    return Drawerleft.query(buildQuery({ model: Drawerleft, filters }))
      .fetchAll({ withRelated })
      .then(data => data.toJSON());
  },

  /**
   * Promise to fetch a/an drawerleft.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Drawerleft.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    return Drawerleft.forge(_.pick(params, 'id')).fetch({
      withRelated: populate
    });
  },

  /**
   * Promise to count a/an drawerleft.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = convertRestQueryParams(params);

    return Drawerleft.query(buildQuery({ model: Drawerleft, filters: _.pick(filters, 'where') })).count();
  },

  /**
   * Promise to add a/an drawerleft.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Drawerleft.associations.map(ast => ast.alias));
    const data = _.omit(values, Drawerleft.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Drawerleft.forge(data).save();

    // Create relational data and return the entry.
    return Drawerleft.updateRelations({ id: entry.id , values: relations });
  },

  /**
   * Promise to edit a/an drawerleft.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Drawerleft.associations.map(ast => ast.alias));
    const data = _.omit(values, Drawerleft.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Drawerleft.forge(params).save(data);

    // Create relational data and return the entry.
    return Drawerleft.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an drawerleft.
   *
   * @return {Promise}
   */

  remove: async (params) => {
    params.values = {};
    Drawerleft.associations.map(association => {
      switch (association.nature) {
        case 'oneWay':
        case 'oneToOne':
        case 'manyToOne':
        case 'oneToManyMorph':
          params.values[association.alias] = null;
          break;
        case 'oneToMany':
        case 'manyToMany':
        case 'manyToManyMorph':
          params.values[association.alias] = [];
          break;
        default:
      }
    });

    await Drawerleft.updateRelations(params);

    return Drawerleft.forge(params).destroy();
  },

  /**
   * Promise to search a/an drawerleft.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = strapi.utils.models.convertParams('drawerleft', params);
    // Select field to populate.
    const populate = Drawerleft.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const associations = Drawerleft.associations.map(x => x.alias);
    const searchText = Object.keys(Drawerleft._attributes)
      .filter(attribute => attribute !== Drawerleft.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['string', 'text'].includes(Drawerleft._attributes[attribute].type));

    const searchInt = Object.keys(Drawerleft._attributes)
      .filter(attribute => attribute !== Drawerleft.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['integer', 'decimal', 'float'].includes(Drawerleft._attributes[attribute].type));

    const searchBool = Object.keys(Drawerleft._attributes)
      .filter(attribute => attribute !== Drawerleft.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['boolean'].includes(Drawerleft._attributes[attribute].type));

    const query = (params._q || '').replace(/[^a-zA-Z0-9.-\s]+/g, '');

    return Drawerleft.query(qb => {
      if (!_.isNaN(_.toNumber(query))) {
        searchInt.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query)}`);
        });
      }

      if (query === 'true' || query === 'false') {
        searchBool.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query === 'true')}`);
        });
      }

      // Search in columns with text using index.
      switch (Drawerleft.client) {
        case 'mysql':
          qb.orWhereRaw(`MATCH(${searchText.join(',')}) AGAINST(? IN BOOLEAN MODE)`, `*${query}*`);
          break;
        case 'pg': {
          const searchQuery = searchText.map(attribute =>
            _.toLower(attribute) === attribute
              ? `to_tsvector(${attribute})`
              : `to_tsvector('${attribute}')`
          );

          qb.orWhereRaw(`${searchQuery.join(' || ')} @@ to_tsquery(?)`, query);
          break;
        }
      }

      if (filters.sort) {
        qb.orderBy(filters.sort.key, filters.sort.order);
      }

      if (filters.skip) {
        qb.offset(_.toNumber(filters.skip));
      }

      if (filters.limit) {
        qb.limit(_.toNumber(filters.limit));
      }
    }).fetchAll({
      withRelated: populate
    });
  }
};
