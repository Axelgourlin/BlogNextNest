import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { CategoryEntity } from '../models/category.entity';
import { Category } from '../models/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(category: Category): Observable<Category> {
    return from(this.categoryRepository.save(category));
  }

  findAll(): Observable<Category[]> {
    return from(this.categoryRepository.find());
  }

  findOne(id: number): Observable<Category> {
    return from(this.categoryRepository.findOne(id));
  }

  updateOne(id: number, category: Category): Observable<any> {
    return from(this.categoryRepository.update(id, category));
  }

  deleteOne(id: number): Observable<any> {
    return from(this.categoryRepository.delete(id));
  }
}
