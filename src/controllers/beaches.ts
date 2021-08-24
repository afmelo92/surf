import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import logger from '@src/logger';
import { authMiddleware } from '@src/middlewares/auth';
import { Beach } from '@src/models/beach';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('beaches')
@ClassMiddleware(authMiddleware)
export class BeachesController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new Beach({ ...req.body, ...{ user: req.decoded?.id } });
      const result = await beach.save();

      res.status(201).send(result);
    } catch (err: unknown) {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ error: (err as Error).message });
      } else {
        logger.error(err as Error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
