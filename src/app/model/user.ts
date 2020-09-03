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

    // get total(this.aliases) {
    //     let sum = 0;
    //     for (let i in this.aliases) 
    //       sum += this.aliases[i];
    //     return sum;
    //   }



      get total() {
        let sum = 0;
        for (let i in this.aliases) 
          sum += this.aliases[i]
        return sum;
      }
    
// expected output: 81
}