   const { StatusCodes } = require("http-status-codes");
   const mailsend = require('../config/mail')

   //send an email
   const sendEmail = async (req, res) => {
      try {
         const { to , subject, content } = req.body


         const filesData = [
            {
                filename: "data.txt",
                path: "http://localhost:4900/data.txt"
            },
            {
                filename: "tech.pdf",
                path: "http://localhost:4900/tech.pdf"
            },
        ]
         //send mail
         const mailRes = await mailsend(to,subject,content, filesData)
         
         // if mail rejected
         if(mailRes.rejected[0] === to)
            return res.status(StatusCodes.CONFLICT).json({ success: false, msg : `Error sending email to ${to}`})

         //if mail id accepted
         if(mailRes.accepted[0] === to)
            return res.status(StatusCodes.ACCEPTED).json({ success: true, msg : `email sent successfully to ${to}`})

      

      } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message });
      }
   }

   //read a stored email

   const readEmail = async (req, res) => {
      try {
      res.json({ msg: "read mail"})
      } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message });
      }
   }

   //delete a stored email
   const deleteEmail = async (req, res) => {
   try{
   res.json({ msg: "delete mail"})
   }catch(err){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message });
   }
   }

   module.exports = { sendEmail, readEmail, deleteEmail }