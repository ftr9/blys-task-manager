import { NextFunction,Request,Response } from "express";


/**
 * Wraps an asynchronous route handler a.k.a controller to automatically catch any errors and pass them to the global error handling middleware.
 * This eliminates the need for repetitive try-catch blocks in each controller function.
 *
 * @param {function} fn The controller function (req, res, next) => {} containing the business logic.
 * @returns {function} A modified controller function that handles errors using the provided routeFn and passes them to the 'next' middleware.
 */
export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
};