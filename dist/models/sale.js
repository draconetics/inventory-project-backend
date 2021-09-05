"use strict";
const mongoose = require("mongoose");
const saleSchema = new mongoose.Schema({
    sale_code: { type: String, required: true },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    // Date and Time of meeting
    date: { type: Date, required: true }
}, { timestamps: true });
module.exports = mongoose.model("Sale", saleSchema);
