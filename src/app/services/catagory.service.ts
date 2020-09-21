import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(private db:AngularFirestore, private toastr:ToastrService) { }

  saveChanges(data){
    this.db.collection('catagories').add(data).then( s => {
     this.toastr.success("New catagory saved successfully")
    })
  }
  loadCatagories(){
     return this.db.collection('catagories').snapshotChanges().pipe(
      map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, data}
          })
      })
    );
  }
  updateCatagory(id:string,newCatagory,newBody:string){
    this.db.doc("catagories/"+id).update({catagory:newCatagory,body:newBody}).then(u =>{
      this.toastr.success("Updated successfully")

    })
  }

  deleteCatagory(id:string){
    this.db.doc("catagories/"+id).delete().then(ref =>{
      this.toastr.info("Deleted successfully")

    });
  }
}
