import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.inteface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {

    todos: Todo[] = [
        {
            id: 1,
            title: 'Ménage',
            description: 'Faire le ménage dans la chambre',
            done: false
        },
        {
            id: 2,
            title: 'Courses',
            description: 'Acheter du lait et du pain',
            done: true
        },
        {
            id: 3,
            title: 'Sport',
            description: 'Faire du sport pendant 30 minutes',
            done: false
        }
    ];

    getTodos(): Todo[] {
        return this.todos;
    }

    getTodoById(id: number): Todo {
        return this.todos.find(todo => todo.id === id);
    }

    create(todo: CreateTodoDto) {
        this.todos = [...this.todos, todo];
    }

    update(id: number, todo: CreateTodoDto) {
        // Récupérer le todo
        const todoToUpdate = this.todos.find(todo => todo.id === id)

        if (!todoToUpdate)
            throw new NotFoundException(`The todo with id ${id} doesn't exist :(`)

        // Appliquer les modifications
        if (todo.title)
            todoToUpdate.title = todo.title;

        if (todo.description)
            todoToUpdate.description = todo.description;

        if (todo.hasOwnProperty('done'))
            todoToUpdate.done = todo.done;

        const updatedTodos = this.todos.map(todo => todo.id !== id ? todo : todoToUpdate)
        this.todos = [...updatedTodos];

        return { updatedTodos: 1, todos: todoToUpdate };
    }

    delete(id: number) {
        const todosLenght = this.todos.length

        this.todos = [...this.todos.filter(todo => todo.id !== id)]

        if (this.todos.length < todosLenght)
            return { deletedTodos: 1, nbTodos: this.todos.length }
        else
            return { deletedTodos: 0, nbTodos: this.todos.length }
    }

}
