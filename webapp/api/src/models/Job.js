import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  name: String,
  job_session: String,
  resume: String,
  type: String,
  summary_or_objective: String,
  number_of_portfolio: Number,
  portfolio_score: Number,
  number_of_companies: Number,
  work_experience_score: Number,
  work_experience: String,
  education_score: Number,
  education: String,
  years_of_experiance: Number,
  achievements_or_awards: String,
  top_skill: String,
  skills: String,
  skill_relevancy_score: Number,
  relevance: Number,
  total_score: Number
});

const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    jt: {
      type: String,
      required: true,
      trim: true,
      maxLength: 4000,
    },
    jd: {
      type: String,
      required: true,
      trim: true,
      maxLength: 4000,
    },
    profile: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    channels: {
      type: [String],
      required: true,
    },
    resumes: {
      type: [String],
      required: true,
    },
    processed: { type: Boolean, default: false },
    results: [ResultSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

JobSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Job = mongoose.model('Job', JobSchema);

export default Job;
