import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateFareDto } from './dto/create-fare.dto';
import { CreateFareUseCase } from './use-cases/fare.use-case';
import { GenerateReceiptUseCase } from './use-cases/generate-receipt.use-case';
import { GenerateReceiptDto } from './dto/generate-receipt.dto';
@Controller('')
export class RaceController {
  @Inject(CreateFareUseCase)
  private readonly createFareUseCase: CreateFareUseCase;
  @Inject(GenerateReceiptUseCase)
  private readonly generateReceiptUseCase: GenerateReceiptUseCase;

  @Post('fare')
  createFare(@Body() createFareDto: CreateFareDto) {
    return this.createFareUseCase.execute(createFareDto);
  }

  @Post('race')
  async acceptRace(@Body() generateReceiptDto: GenerateReceiptDto) {
    return await this.generateReceiptUseCase.execute(generateReceiptDto);
  }
}
