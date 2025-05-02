const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: String,
  state: Boolean,
  createdDate: Date,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = model('Task', taskSchema);
