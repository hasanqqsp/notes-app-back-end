/* eslint-disable require-jsdoc */
const ClientError = require('../../exceptions/ClientError');

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const {title = 'untitled', body, tags} = request.payload;
    const credentialId = request.auth.credentials.id;
    const noteId = await this._service.addNote({
      title,
      body,
      tags,
      owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });
    response.code(201);
    return response;
  }

  async getNotesHandler(request) {
    const credentialId = request.auth.credentials.id;
    const notes = await this._service.getNotes(credentialId);
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  async getNoteByIdHandler(request, h) {
    const {id: noteId} = request.params;
    const credentialId = request.auth.credentials.id;
    await this._service.verifyNoteAccess(noteId, credentialId);
    const note = await this._service.getNoteById(noteId);

    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  async putNoteByIdHandler(request, h) {
    this._validator.validateNotePayload(request.payload);

    const {id: noteId} = request.params;
    const credentialId = request.auth.credentials.id;
    await this._service.verifyNoteAccess(noteId, credentialId);

    await this._service.editNoteById(noteId, request.payload);

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };
  }

  async deleteNoteByIdHandler(request, h) {
    const {id: noteId} = request.params;
    const credentialId = request.auth.credentials.id;
    await this._service.verifyNoteOwner(noteId, credentialId);
    await this._service.deleteNoteById(noteId);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = NotesHandler;
