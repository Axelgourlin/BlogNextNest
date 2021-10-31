import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Article } from '../models/article.interface';
import { ArticlesService } from '../articles.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() article: Article): Observable<Article> {
    return this.articlesService.create(article);
  }

  @Get()
  index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Observable<Pagination<Article>> {
    limit = limit > 100 ? 100 : limit;
    return this.articlesService.paginate({
      page: Number(page),
      limit: Number(limit),
      route: 'http://localhost:4000/articles',
    });
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
