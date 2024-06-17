const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "emailid": { type: String, required: true },
        "medicine": { type: String, required: true },
        "advice": { type: String, required: true },
        "remarks": { type: String, required: true }
    }
)
let prescriptionsmodel = mongoose.model("prescription", schema);
module.exports = { prescriptionsmodel }