import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

export class RegistrationDto {
  @IsString()
  @MinLength(3, {
    message: 'Name min 3 letters',
  })
  @MaxLength(10, {
    message: 'Name max 10 letters',
  })
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password min 6 letters',
  })
  @MaxLength(20, {
    message: 'Password max 20 letters',
  })
  password: string;
}
