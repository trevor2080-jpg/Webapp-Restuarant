import { Test, TestingModule } from '@nestjs/testing';
import { RestuarantController } from './restuarant.controller';
import { RestuarantService } from './restuarant.service';

describe('RestuarantController', () => {
  let controller: RestuarantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestuarantController],
      providers: [RestuarantService],
    }).compile();

    controller = module.get<RestuarantController>(RestuarantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
