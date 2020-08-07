export class User {
    
    $key:number;
    uid:string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state:string;
    zip:number;
    aliases: Array<number>;

    get total() {
        let sum = 0;
        for (let alias in this.aliases) 
          sum += this.aliases[alias];
        return sum;
      }

    
// expected output: 81
}