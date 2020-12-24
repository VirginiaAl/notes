const { Schema, model } = require('mongoose')

const NoteSchema = new Schema({
    title: String,
    description: String,
    user: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema)