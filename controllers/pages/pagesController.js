
const asyncHandler = require('express-async-handler')

const Job = require('../../models/Job');

const dashboardController = asyncHandler(async (req,res) => {
    const userId = req?.session?.user?.userId
    const jobs = userId && await Job.find({createdBy: userId}).exec();
    const context = {
        title: 'Job Tracker | HomePage',
        user: req.session?.user,
        jobs: jobs
    }
    res.render("dashboard",context);
})

const jobController = asyncHandler(async (req,res) => {
    context = {
        title: "Track Job",
        user: req.session.user
    }
    res.render("newJob",context)
})

const jobDetailController = asyncHandler(async (req,res) => {
    const jobId = req.params.id;
    const userId = req?.session?.user?.userId;
    
    const job = await Job.findOne({_id: jobId, createdBy: userId}).exec();
    context = {
        title: `${job.company} | ${job.title}`,
        job: job,
        user: req.session.user
    }
    res.render('job_detail',context)
})

const jobEditController = asyncHandler(async (req,res) => {
    const jobId = req.params.id;
    const userId = req?.session?.user?.userId;
    
    const job = await Job.findOne({_id: jobId, createdBy: userId}).exec();
    context = {
        title: `${job.company} | ${job.title}`,
        job: job,
        user: req.session.user
    }
    res.render('edit_job',context)
})


module.exports = {dashboardController,jobController,jobDetailController,jobEditController}