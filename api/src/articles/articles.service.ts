import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { ArticleEntity } from './models/article.entity';
import { Article } from './models/article.interface';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private ArticlesRepository: Repository<ArticleEntity>,
  ) {}

  create(article: Article): Observable<Article> {
    return from(this.ArticlesRepository.save(article));
  }

  findAll(): Observable<ArticleEntity[]> {
    return from(this.ArticlesRepository.find());
  }

  findOne(id: number): Observable<ArticleEntity> {
    return from(this.ArticlesRepository.findOne(id));
  }

  updateOne(id: number, article: Article): Observable<UpdateResult> {
    return from(this.ArticlesRepository.update(id, article));
  }

  deleteOne(id: number): Observable<DeleteResult> {
    return from(this.ArticlesRepository.delete(id));
  }
}
