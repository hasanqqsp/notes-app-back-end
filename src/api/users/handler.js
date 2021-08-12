/* eslint-disable require-jsdoc */
const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }
  errorHandler(error, h) {
    if (error instanceof ClientError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    // Server ERROR!
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);
    console.error(error);
    return response;
  }


  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);
      const {username, password, fullname} = request.payload;

      const userId = await this._service.addUser(
          {username, password, fullname},
      );

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this.errorHandler(error, h);
    }
  }
  async getUserByIdHandler(request, h) {
    try {
      const {id} = request.params;

      const user = await this._service.getUsersById(id);

      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (error) {
      return this.errorHandler(error, h);
    }
  }
}

module.exports = UsersHandler;
