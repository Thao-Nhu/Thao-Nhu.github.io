const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProjectSchema = Schema({
  project_name: String,
  project_description: String,
  company_id: {type: Schema.Types.ObjectId, ref: 'User'},
  start_date: Date,
  end_date:Date,
  cost_estimate:Number,
  status:{
    type:String,
    enum: ['Cost Estimate','Started', 'Interview', 'Development', 'Delivered']
  },
  comments:[{
    content:String,
    created_at:{ type: Date, default: Date.now }
  }]
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
