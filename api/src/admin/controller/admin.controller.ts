import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Admin } from '../models/admin.interface';
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

  @Delete(':id')
  deleteOne(@Param() params: any): Observable<any> {
    return this.adminService.deleteOne(params.id);
  }
}
