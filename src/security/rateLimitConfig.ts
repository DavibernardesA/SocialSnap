import { RateLimitRequestHandler, rateLimit } from 'express-rate-limit';

export const rateLimitRequest: RateLimitRequestHandler = rateLimit({
  windowMs: 10 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again in 10 minutes'
});
