import path from "path";
import { container } from 'cheap-di';

import { Logger } from './utils/loggers';

/**
 * @param {Request<ParamsDictionary, any, any, ParsedQs>} request
 * @param {Response<any>} response
 * @param {NextFunction} next
 */
function handleNotFoundMiddleware(request, response, next) {
    const logger = container.resolve(Logger);
    logger.error(`${request.method} ${request.url} NOT FOUND`);

    const filePath = path.join(__dirname, 'public', 'not-found.html');
    response.status(404).sendFile(filePath);
}

export { handleNotFoundMiddleware };
