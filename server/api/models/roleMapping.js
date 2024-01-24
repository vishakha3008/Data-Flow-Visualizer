const mongoose = require('mongoose');

const roleMappingSchema = new mongoose.Schema({
    role: String,
    permissions: [String], 
});

module.exports = mongoose.model('RoleMapping', roleMappingSchema);