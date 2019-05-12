const bookshelf = require('../bookshelf')
const moment = require('moment');
const Order = bookshelf.Model.extend({
  tableName: 'Orders',
  user: function () {
    return this.belongsTo(require('./user.model'), "User_ID");
  },
  toJSON: function () {

    let attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
    const dateFiel = 'Date';
    attrs[dateFiel] = moment(this.get(dateFiel)).format('YYYY-MM-DD');

    return attrs;
  }
});
module.exports = Order;