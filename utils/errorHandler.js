class errorHandler extends Error {
  constructor() {
    super();
  }
  createError(StatusCode, httpError, errorText) {
    this.StatusCode =  StatusCode;
    this.httpError =   httpError;
    this.errorText =  errorText;
    return this;
  }
}
module.exports =new   errorHandler;
