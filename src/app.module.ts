import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [TodosModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
