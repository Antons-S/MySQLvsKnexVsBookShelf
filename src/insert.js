const db = require('../lib/db');
const knex = require('../lib/knex');
const Order = require('../lib/models/order.model');

const inserObject = {
    User_ID: 1,
    Total_sum: 123.45,
    Date: '2005-05-05 14:45:16'
}

function insertDB() {
    console.time('timer SQL');
    db.connect();
    const sql = "INSERT INTO Orders " +
        "(`User_ID`, " +
        "`Total_sum`, " +
        "`Date`) " +
        "VALUES(" +
        inserObject.User_ID + " ," +
        inserObject.Total_sum + " ," +
        "'" + inserObject.Date + "'" +
        ");"
    db.query(sql, function (error, result, fields) {
        if (error) throw error;
        //console.log(result);
        console.timeEnd('timer SQL')
    });
    db.end();
}

function insertKnex() {
    console.time('timer Knex');
    knex('Orders')
        .insert(inserObject)
        .then(result => {
            //console.log(result)
            console.timeEnd('timer Knex');
        })
}

function insertBS() {
    console.time('timer BookShelf');
    new Order(inserObject)
        .save()
        .then(result => {
            //console.log(result.toJSON());
            console.timeEnd('timer BookShelf');
        })
}

insertDB();
insertKnex();
insertBS();