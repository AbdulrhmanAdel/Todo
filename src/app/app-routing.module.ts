import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatagoryComponent } from './catagory/catagory.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  {path:"",component:CatagoryComponent},
  {path:"todo/:id",component:TodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
