const express = require('express');
const nodemailer = require('nodemailer');

const contactRouter = express.Router();

const router = function(nav){
    contactRouter.route('/')
    .get((req, res)=>{
        res.render('contact', {
            nav, 
            title: 'BookStore'
        });
    })

    contactRouter.route('/send')
    .post((req, res)=>{
        var transporter = nodemailer.createTransport({
            service : 'Gmail',
            auth : {
                user: 'yatin.singla001@gmail.com',
                pass: 'krishna@108'
            }
        })

        var mailOptions = {
            from: 'yatin.singla001@gmail.com',
            to: 'support@bookstore.com',
            subject: 'Website submission',
            text: 'You have submission with following details:\n Name: '+req.body.name+', Email: '+req.body.email+', Phone: '+req.body.phone+', Message: '+req.body.message
        }

        transporter.sendMail(mailOptions, (err, info)=>{
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                console.log('Message Send' + info);
                res.redirect('/');
            }
        })
    })

    return contactRouter;
}

module.exports = router;