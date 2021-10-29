import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Admin, AdminRole } from '../models/admin.interface';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  create(@Body() admin: Admin): Observable<Admin | Object> {
    return this.adminService.create(admin).pipe(
      map((admin: Admin) => admin),
      catchError((error) => of({ error: error.message })),
    );
  }

  @Post('login')
  login(@Body() admin: Admin): Observable<Object> {
    return this.adminService.login(admin).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }

  @Get()
  findAll(): Observable<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any): Observable<Admin> {
    return this.adminService.findOne(params.id);
  }

  @Put(':id')
  updateOne(@Param() params: any, @Body() admin: Admin): Observable<any> {
    return this.adminService.updateOne(params.id, admin);
  }

  @hasRoles(AdminRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  updateRoleOfAdmin(
    @Param() params: any,
    @Body() admin: Admin,
  ): Observable<Admin> {
    return this.adminService.updateRoleOfAdmin(params.id, admin);
  }

  @Delete(':id')
  deleteOne(@Param() params: any): Observable<any> {
    return this.adminService.deleteOne(params.id);
  }
}
