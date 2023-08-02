import { City } from "./city.model";

export class Hotel {
    id : number;
    name : string;
    description : string;
    address : string;
    phone : string;
    stars : number;
    price : number;
    numberOfRoom : number;
    city: City;
    

    constructor(id:number,name:string,description:string,address : string,phone : string,stars:number,price:number,numberOfRoom:number,city: City) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.phone = phone;
        this.stars = stars;
        this.price = price;
        this.numberOfRoom = numberOfRoom;
        this.city = city;
    }
};