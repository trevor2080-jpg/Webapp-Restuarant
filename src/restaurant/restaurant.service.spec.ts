import { Test, TestingModule } from '@nestjs/testing';
import { RestuarantService } from './restuarant.service';

describe('RestuarantService', () => {
  let service: RestuarantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestuarantService],
    }).compile();

    service = module.get<RestuarantService>(RestuarantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
