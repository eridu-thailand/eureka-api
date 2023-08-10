import { Test, TestingModule } from '@nestjs/testing';
import { TikTokController } from './tiktok.controller';

describe('TikTokController', () => {
  let controller: TikTokController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TikTokController],
    }).compile();

    controller = module.get<TikTokController>(TikTokController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
