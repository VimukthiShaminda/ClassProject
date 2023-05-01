const express = require('express')
const connection = require('../connection')
const router = express.Router()

var auth = require('../services/authentication')
var checkRole = require('../services/checkRole')

//posting subjects
router.post('/add',auth.authenticationToken,checkRole.checkRole,(req,res,next)=>{
    let subject = req.body;
    var query = "insert into subjects (name) values(?)"
    connection.query(query,[subject.name],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"subject added successfully"})
        }else{
            return res.status(500).json(err);
        }
    })
})

//getting all subjects
router.get('/get',auth.authenticationToken,(req,res,next)=>{
    var query = "select * from subjects order by name";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(500).json(err)
        }
    })
})

//update subjects
router.patch('/update',auth.authenticationToken,checkRole.checkRole,(req,res,next)=>{
    let subject = req.body;
    var query = "update subjects set name=? where id =?"
    connection.query(query,[subject.name,subject.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
               return res.status(404).json({message:"Subject ID does not found"}) 
            }
            return res.status(200).json({message:"Subject Updated Successfully"})
        }else{
            return res.status(500).json(err)
        }
    })
})

module.exports = router