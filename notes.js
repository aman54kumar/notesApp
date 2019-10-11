const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(note => note.title === title);

  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('Note title added'));
  } else {
    console.log(chalk.red.inverse('note already exists'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title != title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note Removed'));
  } else {
    console.log(chalk.red.inverse('No note found'));
  }
};

const listNotes = () => {
  console.log(chalk.inverse('Your Notes'));
  const notes = loadNotes();
  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(note.body);
    console.log(chalk.inverse(note.title));
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
