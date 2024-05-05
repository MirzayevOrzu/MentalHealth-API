import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    old_password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    new_password: string;
}
