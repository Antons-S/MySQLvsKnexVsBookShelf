const db = require('../lib/db');
const knex = require('../lib/knex');
const User = require('../lib/models/user.model');
const Order = require('../lib/models/order.model');

function selectDB() {
    console.time('timer SQL');
    db.connect();
    db.query('select * from Orders', function (error, result, fields) {
        if (error) throw error;
        //console.log(result);
        console.timeEnd('timer SQL')
    });
    db.end();
}

function selectKnex() {
    console.time('timer Knex');
    knex.select().from('Orders')
        .then(result => {
            //console.log(result)
            console.timeEnd('timer Knex');
        })
}

function selectBS() {
    console.time('timer BookShelf');
    User.fetchAll()
        .then(result => {
            //console.log(result.toJSON());
            console.timeEnd('timer BookShelf');
        })
}


selectDB();
selectKnex();
selectBS();