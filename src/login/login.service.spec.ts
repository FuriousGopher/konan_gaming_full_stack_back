import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UsersRepository } from '../db/repositories/users.repository';

// Mock the UsersRepository
const usersRepositoryMock = {
  findUser: jest.fn(),
};

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: UsersRepository,
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createToken', () => {
    it('should generate a valid JWT token', async () => {
      const userId = '123456';
      const token = await service.createToken(userId);

      expect(typeof token).toBe('string');
      // You can add more assertions for token validity if needed
    });
  });

  describe('getUserInfo', () => {
    it('should return user information when user exists', async () => {
      const userId = '123456';
      const userMock = {
        id: userId,
        login: 'testuser',
        coins: 100,
      };
      usersRepositoryMock.findUser.mockResolvedValue(userMock);

      const result = await service.getUserInfo(userId);

      expect(result).toEqual({
        userName: userMock.login,
        coins: userMock.coins,
      });
    });

    it('should return false when user does not exist', async () => {
      const userId = 'nonexistentuser';
      usersRepositoryMock.findUser.mockResolvedValue(null);

      const result = await service.getUserInfo(userId);

      expect(result).toBe(false);
    });
  });
});
