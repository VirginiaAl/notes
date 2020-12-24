const Note = require("../models/Note");

const noteCtrl = {}


noteCtrl.renderNoteForm = (req, res) => {
    res.render('notes/newNote');
};

noteCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({title, description})
    newNote.user = req.user.id
    await newNote.save();
    req.flash("success_msg", "New note saved! :)");
    res.redirect("/notes");
};

noteCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}); //renderiza las notas por usuario y ordena por fecha creación
  res.render('notes/allNotes', { notes })
};

noteCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id)
  if(note.user != req.user.id){
    req.flash('error_msg', 'Not Authorized')
    res.redirect('/notes')
  }
  console.log(note);
  res.render("notes/editNotes", { note });
};

noteCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description})
  req.flash("success_msg", "Your note is updated successfully!");
  res.redirect("/notes");
};

noteCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  req.flash("success_msg", "Note deleted");
  res.redirect('/notes')
};


module.exports = noteCtrl;