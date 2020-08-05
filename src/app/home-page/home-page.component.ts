import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit{

  users$: Observable<any>;
  profileForm: FormGroup;
  arr:any[];

  constructor
  ( private fb: FormBuilder, 
    private userService: UserService,
    private route: ActivatedRoute
    ) { 


    this.users$ =  this.userService.getAll().snapshotChanges().pipe(map(changes => changes.map(c => (
       {key: c.payload.key, ...c.payload.exportVal()}
      
    ))));
    }

    ngOnInit(){
      this.profileForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        address: this.fb.group({
          street: [''],
          city: [''],
          state: [''],
          zip: ['']
        }),
        aliases: this.fb.array([
          this.fb.control('')
        ])
      });
    }



  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  
  addAlias() {
    this.aliases.push(new FormControl());
  }

  editdAlias(patchVal:any) {
    this.aliases.push(this.fb.control(patchVal));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value;
    console.warn(this.profileForm.value);
    if (this.profileForm.valid) this.userService.create(this.profileForm.value);
  }

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
        this.editdAlias(element)
        console.log(element);
      });
 
      // this.arr = action.payload.exportVal(),
      // console.log(action.type);
      // console.log(action.key);
      // console.log(action.payload.val())
    });
  }

}
