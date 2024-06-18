const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const { patientsmodel } = require("./models/patient")
const jwt = require("jsonwebtoken")
const { resultsmodel } = require("./models/result")
const { doctorsmodel } = require("./models/doctoradd")
const { prescriptionsmodel } = require("./models/prescription")
const { feedbacksmodel } = require("./models/feedback")
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://anjali2003:anjali2003@cluster0.wy6js.mongodb.net/diseasedb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}
app.post("/signUp", async (req, res) => {

    let input = req.body
    let hashedpassword = await generateHashedPassword(input.password)
    console.log(hashedpassword)
    input.password = hashedpassword
    let patient = new patientsmodel(input)
    patient.save()
    res.json({ "status": "success" })
})

app.post("/signIn", (req, res) => {
    let input = req.body
    patientsmodel.find({ "emailid": req.body.emailid }).then(
        (response) => {
            if (response.length > 0) {
                let dbPassword = response[0].password
                console.log(dbPassword)
                bcrypt.compare(input.password, dbPassword, (error, isMatch) => {
                    if (isMatch) {
                        jwt.sign({ email: input.emailid }, "patient-app", { expiresIn: "1d" }, (error, token) => {
                            if (error) {
                                res.json({ "status": "unable to create token" })
                            } else {
                                res.json({ "status": "success", "userid": response[0]._id, "token": token })
                            }
                        })

                    } else {
                        res.json({ "status": "incorrect password" })
                    }
                })
            } else {
                res.json({ "status": "user doesn't exist" })
            }
        }
    ).catch()
})

app.post("/AddResult", (req, res) => {
    let input = req.body
    console.log(input)
    let result = new resultsmodel(input)
    result.save()
    res.json({ "status": "success" })
})

app.get("/ViewAllResults", (req, res) => {
    patientsmodel.find().then(
        (data) => {
            res.json(data)
        }
    ).catch((error) => {
        res.json(error)
    })
})

app.get("/viewfeedback",(req,res)=>{
  feedbacksmodel.find().then(
    (data)=>{
        res.json(data)
    }
  ).catch((error)=>{

    res.json(error)
  })  
})


app.post("/AddPrescription",(req,res)=>{
    let input=req.body
    console.log(input)
    let prescription=new prescriptionsmodel(input)
    prescription.save()
    res.json({"status":"success"})
})

app.post("/searchprescription", (req, res) => {
    let input = req.body
    prescriptionsmodel.find(input).then(
        (data) => {
            res.json(data)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
})

app.post("/searchresult",(req,res)=>{
    let input=req.body
    resultsmodel.find(input).then(
        (data)=>{
            res.json(data)
        }
    ).catch((error)=>{
        res.json(error)
    })
})


app.post("/AddFeedback", (req, res) => {
    let input = req.body
    console.log(input)
    let feedback = new feedbacksmodel(input)
    feed.save()
    res.json({ "status": "success" })
})
//signup doctor
app.post("/dsignup",async(req,res)=>{
    let input=req.body
    let hashPassword=await generateHashedPassword(input.dpassword)
    console.log(hashPassword)
    input.dpassword=hashPassword
    let doctoradd=new doctorsmodel(input)
    doctoradd.save()
    res.json({"status":"success"})
})


//signin doctor
app.post("/dsignin",(req,res)=>{
    let input=req.body
    doctorsmodel.find({"dmail":req.body.dmail}).then((response)=>{
        if (response.length>0) {
            let dbdPassword=response[0].dpassword
            console.log(dbdPassword)
            bcrypt.compare(input.dpassword,dbdPassword,(error,isMatch)=>{
                if (isMatch) {
                    jwt.sign({email:input.dmail},"doctor-app",{expiresIn:"1d"},(error,token)=>{
                      if (error) {
                        res.json({"status":"unabel to create token"})
                      } else {
                       res.json({"status":"success","userId":response[0]._id,"token":token}) 
                      }  
                    })
                } else {
                    res.json({"status":"incorrect password"})
                }
            })
        } else {
            res.json({"status":"user not found"})
        }
    }).catch()
})

app.listen(8080, () => {
    console.log("server started")
})