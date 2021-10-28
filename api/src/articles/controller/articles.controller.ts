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
import { Article } from '../models/article.interface';
import { ArticlesService } from '../articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() article: Article): Observable<Article> {
    return this.articlesService.create(article);
  }

  @Get()
  findAll(): Observable<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any): Observable<Article> {
    return this.articlesService.findOne(params.id);
  }

  @Put(':id')
  updateOne(@Param() params: any, @Body() article: Article): Observable<any> {
    return this.articlesService.updateOne(params.id, article);
  }

  @Delete(':id')
  deleteOne(@Param() params: any): Observable<any> {
    return this.articlesService.deleteOne(params.id);
  }
}
