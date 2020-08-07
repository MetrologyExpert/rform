import { User } from '../model/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {Observable, observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { element } from 'protractor';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent {

  users$: Observable<User[]>;
  user:User;
  profileForm: FormGroup;
  arr:any[];
  index:number = 0;
  calculator: User;


  constructor
  ( private fb: FormBuilder, 
    private userService: UserService,
    private route: ActivatedRoute
    ) { 
        this.users$ =  this.userService.getAll().snapshotChanges().pipe(map(changes => changes.map(c => (
        {key: c.payload.key, ...c.payload.exportVal()}))));     

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      aliases: this.fb.array([
        this.fb.control('',Validators.required), 
      ])
    });
    }

    // property Path to aliases
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  
  //add new controls to Aliases FormArray
  addAlias() {
    this.aliases.push(this.fb.control('', Validators.required));
  }

  removeAlias(index)
  {
    // deleteContribution(unc, index) {
    //   unc.get("contributions").removeAt(index);
    //this.aliases.removeAt(0);
    this.aliases.removeAt(index);
  }

  //load controls to fill up with values
  loadAlias(patchVal:any) {
    this.aliases.push(this.fb.control(patchVal));
  }

   //View data 
  readData(key:string){
   this.userService.readUserData(key).snapshotChanges().subscribe(action => {
      //cleat the form
      this.aliases.clear();
      //load static controls values
      this.profileForm.patchValue({
      firstName: action.payload.exportVal().firstName,
      lastName: action.payload.exportVal().lastName,
      address: action.payload.exportVal()['address'],
      }),
      
      //load dynamic control values
      this.arr = action.payload.val()['aliases'];
      this.arr.forEach(element => {
        this.loadAlias(element)
             });
 
      // this.arr = action.payload.exportVal(),
      // console.log(action.type);
      // console.log(action.key);
      // console.log(action.payload.val())
    });
  }


  updateData(id){
    this.userService.updateData(id, this.profileForm.value);
  }

  // if (this.id) 
  // {
  //   this.productService.updateProduct(this.id, product);
  //   console.log(product);
  // }

  //Submit new object/item in list
  onSubmit() {
    console.warn(this.profileForm.value);
    if (this.profileForm.valid){      
         this.userService.create(this.profileForm.value);
    }
  }
}
