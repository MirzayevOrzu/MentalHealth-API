import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUsersDto: CreateUserDto) {
        return this.usersService.create(createUsersDto);
    }

    @Get(':id')
    show(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.show({ id });
    }

    @Get()
    list(@Query() findUsersDto: FindUsersDto) {
        return this.usersService.list(findUsersDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update({ id }, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove({ id });
    }

    @Post('change-password')
    changePassword(
        @CurrentUser('id') id: number,
        @Body() changePasswordDto: ChangePasswordDto,
    ) {
        return this.usersService.changePassword({ id }, changePasswordDto);
    }
}
