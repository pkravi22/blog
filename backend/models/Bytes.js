const mongoose = require('mongoose');

const bytesSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  fileType: String,
  uploadedAt: { type: Date, default: Date.now },
});

const Byte = mongoose.models.Byte || mongoose.model("Byte", bytesSchema, "Bytes");

module.exports = Byte;