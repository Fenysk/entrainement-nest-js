import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.inteface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ToNumberPipe } from './pipes/to-number/to-number.pipe';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Get()
    getTodos(): Todo[] {
        return this.todosService.getTodos();
    }

    @Get(':id')
    getTodoById(@Param('id') id: string) {
        return this.todosService.getTodoById(+id);
    }

    @Get('use-pipe/:id')
    // @UsePipes(ToNumberPipe)
    getTodoByIdWithPipe(@Param('id', ToNumberPipe) id: number) {
        return this.todosService.getTodoById(+id);
    }

    @Get('use-parse-int-pipe/:id')
    getTodoByIdWithParseIntPipe(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.getTodoById(id);
    }


    @Post()
    createTodo(@Body() newTodo: CreateTodoDto) {
        this.todosService.create(newTodo);
    }

    @Patch(':id')
    updateTodoById(@Param('id') id: string, @Body() todo: CreateTodoDto) {
        return this.todosService.update(+id, todo)
    }

    @Delete(':id')
    deleteTodoById(@Param('id') id: string) {
        return this.todosService.delete(+id)
    }

}
