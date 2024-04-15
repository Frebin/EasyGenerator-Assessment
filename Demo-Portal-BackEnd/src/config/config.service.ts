import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    // Load environment variables from .env file or system environment
    this.envConfig = process.env;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getJwtSecret(): string {
    return this.envConfig.JWT_SECRET_KEY; // Assuming you have a JWT_SECRET environment variable
  }

  getJwtExpiresIn(): string {
    return this.envConfig.JWT_EXPIRES_IN; // Assuming you have a JWT_EXPIRES_IN environment variable
  }

  // Define other methods to retrieve specific configuration values as needed
}
