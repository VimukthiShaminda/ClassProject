const express = require('express')
const connection = require('../connection')
const router = express.Router()
let ejs = require('ejs')
let pdf = require('html-pdf')
let path = require('path')
let fs = require('fs')
var uuid = require('uuid')
var auth = require('../services/authentication')
const { generateKey } = require('crypto')

router.post('/generateReport', auth.authenticationToken, (req, res) => {
    const generatedUuid = uuid.v1()
    const Details = req.body
    var teacherDetailsReport = JSON.parse(Details.teacherDetails)

    var query = "insert into bill (name,uuid,email,contactNumber,paymentMethod,total,teacherDetails,createdBy) values(?,?,?,?,?,?,?,?)"
    connection.query(query, [Details.name, generatedUuid, Details.email, Details.contactNumber, Details.paymentMethod, Details.totalAmount, Details.teacherDetails, res.locals.email], (err, results) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, '', "report.ejs"), { teacherDetails: teacherDetailsReport, name: Details.name, email: Details.email, contactNumber: Details.contactNumber, paymentMethod: Details.paymentMethod, totalAmount: Details.totalAmount }, (err, results) => {
                if (err) {
                    return res.status(500).json(err)
                } else {
                    pdf.create(results).toFile('./generated_pdf' + generatedUuid + ".pdf", function (err, results) {
                        if (err) {
                            console.log(err)
                            return res.status(500).json(err)
                        }
                        else {
                            return res.status(200).json({ uuid: generatedUuid })
                        }
                    })
                }
            })
        } else {
            return res.status(500).json(err)
        }
    })
})


module.exports = router