export interface IUser {
    $key:number;
    uid:string;
    firstName: string;
    lastName: string,
    street: string,
    city: string,
    state:string,
    zip:number,
    aliases: Array<string>
}