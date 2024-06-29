const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "emailid": { type: String, required: true },
        "address": { type: String, required: true },
        "phone": { type: String, required: true },
        "age": { type: String, required: true },
        "bloodgrp": { type: String, required: true },
        "disease": { type: String, required: true },
        "diaganosis": { type: String, required: true },
        "password": { type: String, required: true },
        "relativename": { type: String, required: true },
        "relation": { type: String, required: true },
        "relativeaddress": { type: String, required: true },
        "relativephone": { type: String, required: true }
    }
)
let patientsmodel = mongoose.model("patients", schema);
module.exports = { patientsmodel }
