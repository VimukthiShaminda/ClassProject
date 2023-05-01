const express = require('express')
const connection = require('../connection')
const router = express.Router()
var auth = require('../services/authentication')
var checkRole = require('../services/checkRole')
const { route } = require('..')

//post teachers by admin only
router.post('/add', auth.authenticationToken, checkRole.checkRole, (req, res, next) => {
    let teacher = req.body
    var query = "insert into teachers (name,subjectId,description,fee,status)values(?,?,?,?,'true')"
    connection.query(query, [teacher.name, teacher.subjectId, teacher.description, teacher.fee, teacher.status], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Teacher Added Successfully" })
        } else {
            return res.status(500).json(err)
        }
    })
})

//get all teachers
router.get('/get', auth.authenticationToken, (req, res, next) => {
    var query = "select t.id,t.name,t.description,t.fee,t.status,s.id as subjectId,s.name as subjectName from teachers as t INNER JOIN subjects as s where t.subjectId = s.id ";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            return res.status(500).json(err)
        }
    })
})

//getting by subjects 
router.get('/getBySubject/:id', auth.authenticationToken, (req, res, next) => {
    const id = req.params.id
    var query = "select id,name from teachers where subjectId=? and status='true'"
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            return res.status(500).json(err);
        }
    })
})

//getting by id
router.get('/getById/:id', auth.authenticationToken, (req, res, next) => {
    const id = req.params.id
    var query = "select id,name,description,fee from teachers where id =?"
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0])
        } else {
            return res.status(500).json(err)
        }
    })
})


//update teacher by admin
router.patch('/update', auth.authenticationToken, checkRole.checkRole, (req, res, next) => {
    let teacher = req.body
    var query = "update teachers set name=?,subjectId=?,description=?,fee=? where id=?"
    connection.query(query, [teacher.name, teacher.subjectId, teacher.description, teacher.fee, teacher.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Teacher ID does not found" })
            }
            return res.status(200).json({ message: "Teacher Updated Successfully" })
        } else {
            return res.status(500).json(err)
        }
    })
})


//delete teacher by admin
router.delete('/delete/:id', auth.authenticationToken, checkRole.checkRole, (req, res, next) => {
    const id = req.params.id
    var query = "delete from teachers where id=?"
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Teacher ID does not found" })
            }
            return res.status(200).json({ message: "Product Delete Successfully" })
        } else {
            return res.status(500).json(err)
        }
    })
})

//change status
router.patch('/updateStatus', auth.authenticationToken, checkRole.checkRole, (req, res, next) => {
    let user = req.body
    var query = "update teachers set status=? where id=?"
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({message:"Teacher ID does not found"})
            }
            return res.status(200).json({message:"Teacher Status Updated Successfully"})
        } else {
            return res.status(500).json(err)
        }
    })
})

module.exports = router