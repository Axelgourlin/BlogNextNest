import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoryService } from '../service/categories.service';
import { Category } from '../models/category.interface';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() category: Category): Observable<Category> {
    return this.categoryService.create(category);
  }

  @Get()
  findAll(): Observable<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any): Observable<Category> {
    return this.categoryService.findOne(params.id);
  }

  @Put(':id')
  updateOne(@Param() params: any, @Body() category: Category): Observable<any> {
    return this.categoryService.updateOne(params.id, category);
  }

  @Delete(':id')
  remove(@Param() params: any): Observable<any> {
    return this.categoryService.deleteOne(params.id);
  }
}
