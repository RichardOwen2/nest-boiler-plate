import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const apiToken = req.headers['x-api-token'];

    const validToken = process.env.API_TOKEN;

    if (!apiToken) {
      throw new HttpException('API TOKEN is required', 401);
    }

    if (apiToken !== validToken) {
      throw new HttpException('Invalid API TOKEN', 401);
    }

    next();
  }
}
