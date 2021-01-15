const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


//variables

const POSchema = new mongoose.Schema({
  
  poNumber: {
    type: Number,
    required: true, unique:true,
    ref: 'poNumber'
  },

  supplier: {
    type: String,
    required: true,
    //supplierList
     enum: ['Smarts', 'CountyG', 'Blakeley', 'Hydro']
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  jobRef: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'JobRef'
  },
  stock: {
    type: String,
    required: true,
   // ref: 'Stock'
  },
  description: {
    type: String,
    required: true
  }

},
{timestamps: true});




POSchema.plugin(mongoosePaginate);
const PO = mongoose.model('PO', POSchema);

module.exports = PO;
