const mongoose = require('mongoose');



const JobRefSchema = new mongoose.Schema({
  
  jobRef: {
    type: String,
    required: true,
    unique: true 
  
  },
  //dummy data to input 
  address: {
    type: String,
     required: true
   }
 

},

{timestamps: true});

const JobRef = mongoose.model('JobRef', JobRefSchema);

module.exports = JobRef;
