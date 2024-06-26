import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { mkdir, writeFile } from 'fs/promises';
import { GenerateReceiptDto } from '../dto/generate-receipt.dto';
import * as os from 'os';
import * as path from 'path';
@Injectable()
export class GenerateReceiptUseCase {
  async execute(generateReceiptDto: GenerateReceiptDto) {
    try {
      const { userId } = generateReceiptDto;
      const date = new Date().toISOString().split('T')[0];
      const directory = path.join(
        process.cwd(),
        'tmp',
        userId.toString(),
        date,
      );

      await mkdir(directory, { recursive: true });
      const receiptPath = path.join(directory, 'receipt.txt');

      await writeFile(receiptPath, JSON.stringify(generateReceiptDto, null, 2));
    } catch (error) {
      console.error(`Operation failed: ${error}`);
    }
  }
}
