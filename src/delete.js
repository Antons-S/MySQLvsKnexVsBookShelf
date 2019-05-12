const db = require('../lib/db');
const knex = require('../lib/knex');
const Order = require('../lib/models/order.model');


function deleteDB() {
    console.time('timer SQL');
    db.connect();
    const sql = "DELETE FROM Orders " +
    "WHERE id = 301";
    db.query(sql, function (error, result, fields) {
        if (error) throw error;
        console.log(result);
        console.timeEnd('timer SQL')
    });
    db.end();
}

function deleteKnex() {
    console.time('timer Knex');
    knex('Orders')
        .where('id',302)
        .del()
        .then(result => {
            console.log(result)
            console.timeEnd('timer Knex');
        })
}

function deleteBS() {
    console.time('timer BookShelf');
    new Order({id:303})
        .destroy()
        .then(result => {
            console.log(result.toJSON());
            console.timeEnd('timer BookShelf');
        })
}

//deleteDB();
//deleteKnex();
deleteBS();