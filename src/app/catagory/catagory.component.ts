import { Component, OnInit } from '@angular/core';

import { NgForm } from "@angular/forms";

import { CatagoryService } from '../services/catagory.service';
import { strict } from 'assert';
import { stringify } from 'querystring';


@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {
  
  color:Array<any>=["2fc4b2","ec823a","7c3c21","3797a4","45046a","b5076b","f5a7a7","007892","74d4c0","00005c","d63447","ff5200" ,"565d47","120136","fcbf1e","e71414","d8345f","30475e" ,"222831"]
  
  catagories:Array<object>;
  dataStatus:string="Add";
  id:string;
  
  constructor(private catagoryService:CatagoryService) { }

  catagoryName:string;
  body:string="";
  ngOnInit(): void {
    
   this.catagoryService.loadCatagories().subscribe(val => 
    {
      this.catagories =val;
     
     
    }); 
   
  }
  onEdit(catagory:string,id:string){
    this.catagoryName=catagory;
    
    this.id=id;
    this.dataStatus="Edit";
  }

  onDelete(id:string){
    this.catagoryService.deleteCatagory(id);
  }

  onSubmit(f:NgForm){
     let body=f.value.body;
    if(this.dataStatus=='Add'){
      let randomNumber=Math.floor(Math.random()*this.color.length)
      if(f.value.body == ""){
         body = "no body";
      }
      let todoCatagory={
        catagory:f.value.catagoryName,
        
        color:"#"+this.color[randomNumber],
        todoCount:0,
        body:body
      }
     this.catagoryService.saveChanges(todoCatagory);
     
    } else if(this.dataStatus =="Edit"){
        this.catagoryService.updateCatagory(this.id,f.value.catagoryName,f.value.body);
        f.resetForm;
        this.dataStatus="Add";
   
  }

  


  
}
}
