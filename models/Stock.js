const mongoose = require('mongoose');


const StockSchema = new mongoose.Schema({
  
//   stockCode: {
//     type: String,
//     required: true,
//    // ref: 'Stock'
//   },

  description: {
    type: String,
    required: true
  },

  supplier: {
    type: String,
    required: true,
    //supplierList
     enum: ['Smarts', 'CountyG', 'Blakeleys', 'Hydro']
  },
  //material group
  matGRP: {
      type: String,
      required: true,
      //is this case-sensitive.
      enum:['Aluminium', 'Glass', 'PVC', 'Timber']

  },
  cost: {
      type: String,
      required: true
  }

},
{timestamps: true});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;