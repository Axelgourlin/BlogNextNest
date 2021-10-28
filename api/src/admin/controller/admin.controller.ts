import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.interface';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  create(@Body() admin: Admin): Observable<Admin> {
    return this.adminService.create(admin);
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
