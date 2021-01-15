const JobRef = require('../models/JobRef')
const router = require("../routes")



exports.jobList = async (req,res) =>{
  JobRef.find().exec(function(err, jobs){
    if(err){
        res.status(500).json({message: err.message})
    }
    res.render('jobList',{listOfJobs:jobs});
    //pass job to render.

 })
}

//res.render-ejs detail(indiv detail)
exports.jobDetails = async(req,res) =>{
 JobRef.findOne({jobRef: req.params.jobRef}).exec(function(err, job)
    {
        res.render('jobDetail',{job:job});
 })
}


//pass jobs into jobList.ejs
//creating job (or error)-- into EJS
exports.createJobRef = async (req, res)=>{
    const { jobRef, address } = req.body
        var newJob = new JobRef({jobRef, address });
    newJob.save(function(err, job){
        if(err){
            res.status(500).json({message: err.message})
        }
     })
     
    }

  
   exports.updateJobRef = async (req,res) => {
    
     const jobRef = req.params.jobRef;
        try{
            const jobRef = await JobRef.updateOne({jobRef:req.params.jobRef}, req.body);
            res.redirect('/jobs/jobDetail/'+ req.body.jobRef);
       }  catch (e) {
      res.status(404).send({
          message: `could find PO ${jobRef}.`,
          });
        }
       };



        exports.deleteJobRef = async (req,res) => {
            const jobID = req.params.jobID;
            try {
        
                await JobRef.findByIdAndRemove(jobID);
                res.redirect("/jobs/jobList");
              } catch (e) {
                res.status(404).send({
                  message: `could not delete JobRef ${jobRef}.`,
                });
              }
            };