const PO = require('../models/PO')
const router = require("../routes")
const JobRef = require('../models/JobRef')
//create functions inside controller


//.populate("jobRef").
exports.createPOPage = async (req,res)=>{
    JobRef.find().exec(function(err, jobs){
        if(err){
            res.status(500).json({message: err.message})
        }
        res.render('createPO',{listOfJobs:jobs});

        //pass job to render.
    
     })
}


 exports.createPO = async (req, res)=>{
 const { poNumber, supplier, deliveryDate, jobRef, stock, description } = req.body
 var newPO = new PO({poNumber, supplier, deliveryDate, jobRef, stock, description});
     newPO.save(function(err, po){
        if(err){
            res.status(500).json({message: err.message})
        }
       
          //res.render('createPO',{listOfJobs:jobs});
          res.redirect('/createPO/poList')
          //pass job to render.
      
      
       })}
    
 

//.populate("jobRef").
exports.poList = async (req,res) =>{
  var query = {};
  var page =1;
  if(req.query.page != null ){
    page = req.query.page;
  }
  var options = {
    sort: { createdAt: -1 },
    page : page,
    populate: 'jobRef',
    lean: true,
    limit: 5
  };
 

PO.paginate(query,options,function(err, pos){
  
    if(err){
              res.status(500).json({message: err.message})
          }
          res.render('poList',{listOfPOS:pos});
          //pass job to render.
      
       })
      }
      

 exports.updatePO = async (req, res) => {
 const poNumber = req.params.poNumber;
 try{
     const PurchaseOrder = await PO.updateOne({poNumber:req.params.poNumber},req.body);
     res.redirect('/createPO/poDetail/'+req.body.poNumber);
    } catch (e) {
      
      res.status(404).send({
          message: `could not find PO ${poNumber}`,
        });
      }
    };

 
 exports.deletePO = async (req,res) =>{
    const poID = req.params.poID;
    try {
        console.log(poID)
        console.log(req.params)
        await PO.findByIdAndRemove(poID);
        res.redirect("/createPO/poList");
      } catch (e) {
        res.status(404).send({
          message: `could not delete  PO ${poNumber}.`,
        });
      }
    };


    exports.poDetail = async(req,res) =>{
    PO.findOne({poNumber: req.params.poNumber}).populate("jobRef").exec(function(err, po)
        //storing ID of jobref
        //PO.findOne({poNumber: req.params.poNumber}).populate("jobRef").exec(function(err, po)
        
           {
            JobRef.find().exec(function(err, jobs){
              if(err){
                  res.status(500).json({message: err.message})
              }
              res.render('poDetail',{po:po,
              listOfJobs:jobs});
              //pass job to render.
          
           })
         
        })
       }


      



   
        



     







