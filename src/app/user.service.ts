import { IUser } from './model/iuser';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

user:any=[];

  constructor(private db:AngularFireDatabase) { 
    
  }

  create(userAddress){
    this.db.list('address').push(userAddress);
  }

  getAll(){

    return this.db.list<any>('/address/');
  }

  readUserData(id){
    // return this.db.object('address' + id);
    return this.db.object('address/' + id)

  }

  updateData(id, data){
    return this.db.object('/address/' + id).update(data);
  }

}
