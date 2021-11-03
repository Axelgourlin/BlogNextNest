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
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article.interface';
import { ArticlesService } from '../articles.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../models/image.interface';
import path = require('path');
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './uploads/articles-images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() article: Article): Observable<Article> {
    return this.articlesService.create(article);
  }

  @Get()
  index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    // @Query('article-name') article_title: string,
  ): Observable<Pagination<Article>> {
    limit = limit > 100 ? 100 : limit;

    // if (article_title === null || article_title === undefined) {
    return this.articlesService.paginate({
      page: +page,
      limit: +limit,
      route: 'http://localhost:4000/articles',
    });
    // } else {
    //   return this.articlesService.paginateFilterByArticleTitle(
    //     {
    //       page: +page,
    //       limit: +limit,
    //       route: 'http://localhost:4000/articles',
    //     },
    //     { article_title },
    //   );
    // }
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

  @UseGuards(JwtAuthGuard)
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req): Observable<Image> {
    console.log('coucou', file);

    return of(file);
  }

  //   @Get('image/:imagename')
  //   findImage(
  //     @Param('imagename') imagename,
  //     @Res() res: Response,
  //   ): Observable<Image> {
  //     return of(
  //       res.sendFile(join(process.cwd(), 'uploads/articles-images/' + imagename)),
  //     );
  //   }
}
