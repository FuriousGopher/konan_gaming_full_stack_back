import {LoginController} from "./login.controller";
import {LoginService} from "./login.service";
import {Test, TestingModule} from "@nestjs/testing";
import {LocalAuthGuard} from "../guards/local-auth.guard";
import {JwtRefreshGuard} from "../guards/jwt-refresh.guard";
import {BadRequestException, NotFoundException} from "@nestjs/common";


describe('LoginController', () => {
  let controller: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    })
        .overrideGuard(LocalAuthGuard)
        .useValue({ canActivate: jest.fn().mockReturnValue(true) })
        .overrideGuard(JwtRefreshGuard)
        .useValue({ canActivate: jest.fn().mockReturnValue(true) })
        .compile();

    controller = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a BadRequestException if token creation fails', async () => {
      const userId = 'user123';
      jest.spyOn(loginService, 'createToken').mockRejectedValueOnce(new Error());

      const response = await controller.login(userId as any, {} as any);

      expect(response).toBeInstanceOf(BadRequestException);
    });

    it('should set a secure refreshToken cookie', async () => {
      const userId = 'user123';
      const token = 'dummyToken';
      jest.spyOn(loginService, 'createToken').mockResolvedValueOnce(token);
      const res = {
        cookie: jest.fn(),
      } as any;

      await controller.login(userId, res);

      expect(res.cookie).toHaveBeenCalledWith('refreshToken', token, {
        sameSite: 'none',
        secure: true,
      });
    });
  });

  describe('getMe', () => {
    it('should return user information when user exists', async () => {
      const userId = 'user123';
      const userInfo = {
        userName: 'testuser',
        coins: 100,
      };
      jest.spyOn(loginService, 'getUserInfo').mockResolvedValueOnce(userInfo);

      const result = await controller.getMe(userId);

      expect(result).toEqual(userInfo);
    });

    it('should return a NotFoundException when user does not exist', async () => {
      const userId = 'nonexistentuser';
      jest.spyOn(loginService, 'getUserInfo').mockResolvedValueOnce(null);

      const response = await controller.getMe(userId);

      expect(response).toBeInstanceOf(NotFoundException);
    });

    it('should return a BadRequestException if getUserInfo throws an error', async () => {
      const userId = 'user123';
      jest.spyOn(loginService, 'getUserInfo').mockRejectedValueOnce(new Error());

      const response = await controller.getMe(userId);

      expect(response).toBeInstanceOf(BadRequestException);
    });
  });
});
