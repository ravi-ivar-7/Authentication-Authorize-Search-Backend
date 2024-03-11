const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongodb
const registerSchema = new Schema({
    EmailId: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String
    },
    F_Name: {
        type: String
    },
    L_Name: {
        type: String
    },
    Permissions: {
        type: [String],
        default: []    
    },
    Token : {
        type : String
    },
    CreatedAt: {
        type : Date,
        default : Date.now()
    }
});

registerSchema.index({
    EmailId: 'text',
    F_Name: 'text',
    L_Name: 'text',
    Permissions: 'text',
  });

const Register = mongoose.model('Register', registerSchema);

module.exports = { Register};
