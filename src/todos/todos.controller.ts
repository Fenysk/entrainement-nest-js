import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.inteface';
import { CreateTodoDto } from './dto/create-todo.dto';

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
