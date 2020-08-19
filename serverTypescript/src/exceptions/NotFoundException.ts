import HttpException from "./HttpException";

class NotFoundException extends HttpException {
    constructor(url: string) {
        super(404, `URL ${url} not found`);
    }
}

export default NotFoundException;
