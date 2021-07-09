import {nanoid} from 'nanoid';
import notes from './notes.js';

const addNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
        newNote,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNoteHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      notes,
    },
  });
  response.code(200);
  return response;
};

const getOneNoteHandler = (request, h) => {
  const id = request.params.id;
  const noteData = notes.find((e) => e.id == id);
  if (noteData) {
    const response = h.response({
      status: 'success',
      data: {
        note: noteData,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateOneNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;
  const id = request.params.id;
  const noteIndex = notes.findIndex((e)=> e.id == id);
  if (noteIndex > -1) {
    notes[noteIndex].title = title;
    notes[noteIndex].tags = tags;
    notes[noteIndex].body = body;
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteOneNoteHandler = (request, h)=> {
  const id = request.params.id;
  const noteIndex = notes.findIndex((e) => e.id == id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};
export {addNoteHandler,
  getAllNoteHandler,
  getOneNoteHandler,
  updateOneNoteHandler,
  deleteOneNoteHandler,
};
