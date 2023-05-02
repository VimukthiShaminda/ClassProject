const express = require('express')
const connection = require('../../connection')
const router = express.Router()
var auth = require('../../services/authentication')

router.get('/details',auth.authenticationToken,(req,res,next)=>{
    var subjectCount
    var teacherCount
    var billCount
    var query = "select count(id) as subjectCount from subjects"
    connection.query(query,(err,results)=>{
        if(!err){
            subjectCount = results[0].subjectCount

            var query = "select count(id) as teacherCount from teachers"
            connection.query(query,(err,results)=>{
                if(!err){
                    teacherCount = results[0].teacherCount

                    var query = "select count(id) as billCount from bill"
                    connection.query(query,(err,results)=>{
                        if(!err){
                            billCount = results[0].billCount
                            var data ={
                                subject : subjectCount,
                                teacher :teacherCount,
                                bill:billCount
                            }
                            return res.status(200).json(data)
                        }else{
                            return res.status(500).json(err)
                        }
                    })

                }else{
                    return res.status(500).json(err)
                }
            })

        }else{
            return res.status(500).json(err)
        }
    })
})

module.exports =router
