const db = require('../lib/db');
const knex = require('../lib/knex');
const Order = require('../lib/models/order.model');

const updateObject = {
    id: 300,
    User_ID: 10,
    Total_sum: 1123.45,
    Date: '2015-05-05 14:45:15'
}

function updateDB() {
    console.time('timer SQL');
    db.connect();
    const sql = "UPDATE Orders SET " +
        "User_ID = " + updateObject.User_ID + " ," +
        "Total_sum = " + updateObject.Total_sum + " ," +
        "Date = " + "'" + updateObject.Date + "' " +
        "WHERE id = " + updateObject.id; +";";

    db.query(sql, function (error, result, fields) {
        if (error) throw error;
        //console.log(result);
        console.timeEnd('timer SQL')
    });
    db.end();
}

function updateKnex() {
    console.time('timer Knex');
    knex('Orders')
        .where({ id: updateObject.id })
        .update(updateObject)
        .then(result => {
            //console.log(result)
            console.timeEnd('timer Knex');
        })
}

function updateBS() {
    console.time('timer BookShelf');
    new Order(updateObject)
        .save(null, { method: 'update' })
        .then(result => {
            //console.log(result.toJSON());
            console.timeEnd('timer BookShelf');
        })
}

updateDB();
updateKnex();
updateBS();