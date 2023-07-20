

const { BadRequestError } = require('../../errors/errors');
const Job = require('../../models/Job');


const asyncHandler = require("express-async-handler")

const createJobController = asyncHandler(async (req,res) => {
    try {
        const job = await Job.create({...req.body, createdBy: req.session.user.userId});
        res.status(200).json({msg: job})    
    } catch (error) {
        throw new BadRequestError("Error occured creating job");
    }
} )


const deleteJobController = asyncHandler(async (req,res) => {
    const jobId = req.params.id;
    try {
        await Job.findByIdAndDelete({_id: jobId, createdBy: req.session.user.userId});
        return res.status(200).json({msg: `Job with id: ${jobId}, deleted Successfully`})    
    } catch (error) {
        throw new BadRequestError("Job could not be deleted")
    }
})


const editJobController = asyncHandler(async (req,res) => {
    const jobId = req.params.id;
    const userId = req?.session?.user?.userId;
    console.log(userId);
    try {
        await Job.findOneAndUpdate({_id: jobId, createdBy: userId},{...req.body}).exec();
        res.status(201).json({msg: "Job updated successfully"});
    } catch (error) {
        throw new BadRequestError("Job could not be updated")
    }
})


module.exports = {createJobController, deleteJobController,editJobController}