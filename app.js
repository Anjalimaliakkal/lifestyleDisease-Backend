const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const { patientsmodel } = require("./models/patient")
const jwt = require("jsonwebtoken")
const {doctorsmodel}=require("./models/doctor")
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://anjali2003:anjali2003@cluster0.wy6js.mongodb.net/diseasedb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

const generateHasheddPassword=async (dpassword)=>{
    const salt=await bcrypt.genSalt(9)
    return bcrypt.hash(dpassword,salt)
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


//doctor signup//
app.post("/dsignup",async(req,res)=>{
    let input=req.body
    let hashPassword=await generateHasheddPassword(input.dpassword)
    console.log(hashPassword)
    input.dpassword=hashPassword
    let doctor=new doctorsmodel
    doctor.save()
    res.json({"status":"success"})
})

//doctor signin//
app.post("/dsignin",(req,res)=>{
    let input=req.body
    doctorsmodel.find({"dmail":req.body.dmail}).then((response)=>{
        if (response.length>0) {
            let ddbpassword=response[0].dpassword
            console.log(ddbpassword)
            bcrypt.compare(input.dpassword,ddbpassword,(error,isMatch)=>{
                if (isMatch) {
                    jwt.sign({email:input.dmail},"doctor-app",{expiresIn:"1d"},(error,token)=>{
                        if (error) {
                            res.json({"status":"Unable to create token"})
                        } else {
                         res.json({"status":"success","userId":response[0]._id,"token":token})   
                        }
                    })
                } else {
                   res.json({"status":"Incorrect Password"}) 
                }
            })
        } else {
            res.json({"status":"User Not Found"})
        }
    }).catch()
})

app.listen(8080, () => {
    console.log("server started")
})
