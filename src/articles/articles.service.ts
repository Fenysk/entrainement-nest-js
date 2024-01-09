import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {

    articles = [
        {
            id: 1,
            title: 'Apple dévoile son Vision Pro',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae quam euismod, aliquam ni',
            slug: 'apple-devoile-son-vision-pro'
        }
    ];

    getArticles() {
        return this.articles;
    }

    createArticle(article: CreateArticleDto) {
        this.articles.push(article);
    }

}
