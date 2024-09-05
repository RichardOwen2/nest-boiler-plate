import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const apiToken = req.headers['X-API-KEY'];

    const validToken = process.env.API_TOKEN;

    if (!apiToken) {
      throw new HttpException('API token is required', 401);
    }

    if (apiToken !== validToken) {
      throw new HttpException('Invalid API token', 401);
    }

    next();
  }
}
