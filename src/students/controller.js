const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (err, results) => {
        if (err) {
            throw new Error(err);
        }
        res.status(200).json(results.rows);
    })
}

const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (err, results) => {
        if (err) {
            throw new Error(`Error while making query: ${err}`);
        }
        res.status(200).json(results.rows);
    })
}

const addStudent = (req, res) => {
    const data = req.body;
    // check if email exists
    pool.query(queries.checkEmailExists, [data.email], (err, result) => {
        if (result.rows.length) {
            res.send("Email already exists!!");
        }
        else {
            // add student to db
            pool.query(
                queries.addStudent, 
                [ data.name, data.email, parseInt(data.age), data.dob ], (error, result) => {
                    if (error) {
                        throw new Error(`Error while adding student ${error}`);
                    }
                    res.status(201).json(result);
                })
            }
        });

}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (!results.rows.length) {
            res.send("Student does not exists!!");
        }
        else {
            pool.query(queries.removeStudent, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    res.json(`Error while adding student ${err}`)
                }
                else {
                    res.send("Student deleted successfully")
                }
            })
        }
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(queries.getStudentsById, [id], (err, result) => {
        if (!result.rows.length) {
            res.send("Student does not exists!");
        }

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) {
                throw new Error(`Error while updating ${error}`)
            }
            res.send("Updated successfully!!");
        })
    })
}


module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    removeStudent,
    updateStudent
}