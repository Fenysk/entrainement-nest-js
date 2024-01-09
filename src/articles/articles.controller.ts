import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { SlugPipe } from './pipes/slug/slug.pipe';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Get()
    getArticles() {
        return this.articlesService.getArticles();
    }

    @Post()
    createArticle(@Body('title', SlugPipe) title, @Body() allBody) {
        allBody.slug = title;
        this.articlesService.createArticle(allBody);
    }
}
