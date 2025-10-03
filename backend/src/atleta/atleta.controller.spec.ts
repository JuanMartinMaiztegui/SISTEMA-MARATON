import { Test, TestingModule } from '@nestjs/testing';
import { AtletaController } from './atleta.controller';

describe('AtletaController', () => {
  let controller: AtletaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtletaController],
    }).compile();

    controller = module.get<AtletaController>(AtletaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
