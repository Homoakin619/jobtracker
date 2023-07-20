const mongoose = require('mongoose');
const Schema = mongoose.Schema

const JobSchema = new Schema({
    title: {
        type: String,
        required: [true,"Enter a job title"]
    },
    company: {
        type: String,
        required: [true, "Indicate the job company"]
    },
    description: {
        type: String,
    },
    role: {
        type: String,
        required: [true,"Please enter a job role"]
    },
    status: {
        type: String,
        // enum: {
        //     []
        // }
    },
    date_applied: {
        type: Date,
        required: [true,"Specify the job application date"],
    },
    interview_date: {
        type: Date,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

JobSchema.virtual('url').get( function(){
    return `/page/job/${this._id}`
} )

JobSchema.virtual('editUrl').get( function(){
    return `/page/job/edit/${this._id}`
} )

JobSchema.virtual('deleteUrl').get( function(){
    return `/api/v1/job/${this._id}`
} )

JobSchema.virtual('formattedInterviewDate').get( function () {
    // let date = 
    // let formattedDate = date.split('-').reverse().join('-')
    return this.interview_date.toISOString().split('T')[0];
} )

JobSchema.virtual('formattedDateApplied').get( function () {
    return this.date_applied.toISOString().split('T')[0];
} )

const Job = mongoose.model('Job',JobSchema);


module.exports = Job;