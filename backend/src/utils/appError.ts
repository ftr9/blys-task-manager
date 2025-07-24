/**
 * Custom error class for known errors.
 * @extends {builtin Error} class
 *
 * This class is used to differentiate between known errors and internal errors.
 *
 * global error handling middleware can distinguish between errors that are expected and handled versus unexpected internal errors.
 */

class AppError extends Error {
    statusCode:number;
    status:string;
    isOperational:boolean;

    constructor(message:string, statusCode:number) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export default AppError