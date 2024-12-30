const mongoose = require('mongoose');
const {model, Schema} = mongoose

const taskSchema = new Schema({
    title: String,
    description: String,
    state: Boolean,
    createdDate: Date
})

taskSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

const Task = model('Task', taskSchema)

const task = new Task({
    title: 'Hacer los endpoints',
    description: 'Crear los endpoints para la entrevista tecnica',
    state: false,
    createdDate: new Date()
})

module.exports = Task;