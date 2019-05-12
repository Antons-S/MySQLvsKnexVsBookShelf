const bookshelf = require('../bookshelf');
const User = bookshelf.Model.extend({
    tableName: 'Users',
    orders: function(){
      return this.hasMany(require('./order.model'),'User_ID')
    },
    address: function(){
      return this.belongsTo(require("./address.model"),'Address_ID')
    }
  });
module.exports = User;

