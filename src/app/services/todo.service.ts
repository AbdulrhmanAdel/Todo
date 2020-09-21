import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators";
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private db:AngularFirestore,private toastr:ToastrService) { }
  
  saveTodo(id:string,data){
    this.db.collection('catagories').doc(id).collection('todos').add(data).then( s => {
      this.db.doc('catagories/'+ id).update({todoCount:firestore.FieldValue.increment(1)});
      this.toastr.success("New todo saved successfully")
     })
  }

  loadTodos(id:string){
    return this.db.collection('catagories').doc(id).collection('todos').snapshotChanges().pipe(
     map(actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return {id, data}
         })
     })
   );
 }

 updateTodo(id:string,todoId:string,updated:string){
    this.db.collection('catagories').doc(id).collection('todos').doc(todoId)
    .update({todo:updated}).then(
      ref=>{
      this.toastr.success("Updated successfully")
        
      });
 }
 deleteTodo(id:string,todoId:string){
  this.db.collection('catagories').doc(id).collection('todos').doc(todoId).delete()
  .then(s=>{
    this.db.doc('catagories/'+ id).update({todoCount:firestore.FieldValue.increment(1)});
    this.toastr.info("Deleted successfully")

  });
 }
 markComplete(id:string,todoId:string){
  this.db.collection('catagories').doc(id).collection('todos').doc(todoId)
  .update({isCompleted:true}).then(
    ref=>{
    this.toastr.info("todo mark Completed ")
      
    });
 }
 markUncomplete(id:string,todoId:string){
  this.db.collection('catagories').doc(id).collection('todos').doc(todoId)
  .update({isCompleted:false}).then(
    ref=>{
    this.toastr.info("todo Unmarked ")
      
    });
 }
}
