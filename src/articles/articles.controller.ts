import { Body, Controller, Get, Post, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { SlugPipe } from './pipes/slug/slug.pipe';
import { FilterRequestInterceptor } from 'src/interceptors/filter-request/filter-request.interceptor';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Get()
    getArticles() {
        return this.articlesService.getArticles();
    }

    @Post()
    @UseGuards(AuthGuard)
    @SetMetadata('roles', ['ADMIN'])
    @UseInterceptors(FilterRequestInterceptor)
    createArticle(@Body('title', SlugPipe) title, @Body() allBody) {
        allBody.slug = title;
        this.articlesService.createArticle(allBody);
    }
}
