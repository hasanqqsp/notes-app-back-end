import {addNoteHandler,
  getAllNoteHandler,
  getOneNoteHandler,
  updateOneNoteHandler,
  deleteOneNoteHandler} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getOneNoteHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateOneNoteHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteOneNoteHandler,
  },
];

export {routes};
