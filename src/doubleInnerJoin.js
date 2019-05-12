const db = require('../lib/db');
const knex = require('../lib/knex');
const Order = require('../lib/models/order.model');

function selectDB() {
    console.time('timer SQL');
    db.connect();
    const sql = 'select Orders.*, Users.*, Address.* ' +
        'from Orders ' +
        'INNER JOIN Users ON Orders.User_ID = Users.id ' +
        'INNER JOIN Address ON Users.Address_ID = Address.id ';
    db.query(sql, function (error, result, fields) {
        if (error) throw error;
        //console.log(result);
        console.timeEnd('timer SQL')
    });

    db.end();
}

function selectKnex() {
    console.time('timer Knex');
    knex.from('Orders')
        .innerJoin('Users', 'Orders.User_ID', 'Users.id')
        .innerJoin('Address', 'Users.Address_ID', 'Address.id')
        .then(result => {
            //console.log(result)
            console.timeEnd('timer Knex');
        })
}

function selectBS() {
    console.time('timer BookShelf');
    Order.fetchAll({ withRelated: ["user.address"] })
        .then(result => {
            //console.log(result.toJSON());
            console.timeEnd('timer BookShelf');
        })
}

selectDB();
selectKnex();
selectBS();