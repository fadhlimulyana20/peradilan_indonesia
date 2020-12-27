const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'peradilan_indonesia',
    password: '@sapisapi123',
    port: 5432
});

const getTest = (req, res) => {
    pool.query('SELECT * FROM test', (err, results) => {
        if (err){
            throw(err);
        }
        res.status(200).json(results.rows);
    });
}

const createTest = (req, res) => {
    const { name } = req.body;
    console.log(name);

    pool.query('INSERT INTO test (name) VALUES ($1)', [name], (err, results) => {
        if (err){
            throw(err);
        }
        res.status(201).send(`Test added with ID: ${results.insertId}`)
    })
}

const updateTest = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    console.log(name);

    pool.query(
        'UPDATE test SET name = $1 WHERE id = $2',
        [name, id],
        (err, result) =>{
            if (err){
                throw(err);
            }
            res.status(200).send(`Test modified with ID: ${id}`);
        }
    )
}

module.exports = {
    getTest,
    createTest,
    updateTest
}