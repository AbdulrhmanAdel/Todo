import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { NgForm } from '@angular/forms';
import {ActivatedRoute} from "@angular/router"


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
 dataStatus:string='Add';
  catId:string;
  todos:Array<object>;
  todoValue:string;
  todoId:string;


  constructor(private todoService:TodoService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.catId=this.activatedRoute.snapshot.paramMap.get('id');
    
    this.todoService.loadTodos(this.catId).subscribe(val =>
      {
        this.todos=val;
        console.log(this.todos)
      })
  }
  onSubmit(f:NgForm){

    if (this.dataStatus =='Add') {
      let todo ={
        todo:f.value.todotext,
        isCompleted:false
      }
      this.todoService.saveTodo(this.catId,todo);
      f.resetForm;
    }else if(this.dataStatus =='Edit'){
        this.todoService.updateTodo(this.catId,this.todoId,this.todoValue);
        f.resetForm;
    }
  }
  onEdit(id:string,todo:string){
    this.todoValue=todo
    this.todoId=id;
    this.dataStatus="Edit";
    
  }
 
  onDelete(todoId:string){
   
    this.todoService.deleteTodo(this.catId,todoId);
  }

  complete(todoId:string){
    this.todoService.markComplete(this.catId,todoId);
  }
  unComplete(todoId:string){
      this.todoService.markUncomplete(this.catId,todoId)
  }

}
