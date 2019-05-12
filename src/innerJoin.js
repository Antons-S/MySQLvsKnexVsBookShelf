const db = require('../lib/db');
const knex = require('../lib/knex');
const User = require('../lib/models/user.model');

function selectDB() {
    console.time('timer SQL');
    db.connect();
    const sql = 'select Users.*, Address.* ' +
        'from Address ' +
        'INNER JOIN Users ON Address.id = Users.Address_ID';
    db.query(sql, function (error, result, fields) {
        if (error) throw error;
        console.log(result);
        console.timeEnd('timer SQL')
    });

    db.end();
}

function selectKnex() {
    console.time('timer Knex');
    knex.from('Address').innerJoin('Users', 'Address.id', 'Users.Address_ID')
        .then(result => {
            console.log(result)
            console.timeEnd('timer Knex');
        })
}

function selectBS() {
    console.time('timer BookShelf');
    User.fetchAll({ withRelated: ["address"] })
        .then(result => {
            console.log(result.toJSON());
            console.timeEnd('timer BookShelf');
        })
}

//selectDB();
//selectKnex();
//selectBS();