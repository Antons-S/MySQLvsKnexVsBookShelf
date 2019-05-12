const bookshelf = require('../bookshelf')
const Address = bookshelf.Model.extend({
    tableName: 'Address'
  });
module.exports = Address;