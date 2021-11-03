import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleEntity } from './models/article.entity';
import { Article } from './models/article.interface';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

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

  paginate(options: IPaginationOptions): Observable<Pagination<Article>> {
    return from(paginate<Article>(this.ArticlesRepository, options)).pipe(
      map((articlePageable: Pagination<Article>) => {
        return articlePageable;
      }),
    );
  }

  // paginateFilterByArticleTitle(
  //   options: IPaginationOptions,
  //   article: Article,
  // ): Observable<Pagination<Article>> {
  //   return from(
  //     this.ArticlesRepository.findAndCount({
  //       skip: options.page,
  //       take: options.limit || 10,
  //       order: { id: '' },
  //       select: [
  //         'id',
  //         'article_title',
  //         'article_text',
  //         'article_bg_img',
  //         'article_min_img',
  //         'article_createdAt',
  //         'category_id',
  //       ],
  //       where: [{ articleName: Like(`%${article.article_title}%`) }],
  //     }),
  //   ).pipe(
  //     map(([articles, totalArticles]) => {
  //       const articlesPageable: Pagination<Article> = {
  //         items: articles,
  //         links: {
  //           first: options.route + `?limit=${options.limit}`,
  //           previous: options.route + '',
  //           next:
  //             options.route +
  //             `?limit=${options.limit}&page=${+options.page + 1}`,
  //           last:
  //             options.route +
  //             `?limit=${options.limit}&page=${Math.ceil(
  //               totalArticles / +options.limit,
  //             )}`,
  //         },
  //         meta: {
  //           currentPage: +options.page,
  //           itemCount: articles.length,
  //           itemsPerPage: +options.limit,
  //           totalItems: totalArticles,
  //           totalPages: +totalArticles / +options.limit,
  //         },
  //       };

  //       return articlesPageable;
  //     }),
  //   );
  // }

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
