const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "resulturl": { type: String, required: true },
        "name": { type: String, required: true },
        "emailid": { type: String, required: true },
        "date": { type: String, required: true },
        "remarks": { type: String, required: true }
    }
)
let resultsmodel = mongoose.model("result", schema);
module.exports = { resultsmodel }
