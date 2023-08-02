import { Hotel } from "./hotel.model";

export class Booking {
    id : number;
    firstNameOfLessor : string;
    lastNameOfLessor : string;
    phoneNameOfLessor : string;
    mailNameOfLessor : string;
    roomNumber : number;
    checkInDate : Date;
    checkOutDate : Date
    totalPrise : number;
    hotel : Hotel;
    

    constructor(id:number,firstNameOfLessor:string,lastNameOfLessor:string,phoneNameOfLessor : string,mailNameOfLessor : string,roomNumber:number,totalPrise:number,checkInDate : Date,checkOutDate : Date,hotel : Hotel) {
        this.id = id;
        this.firstNameOfLessor = firstNameOfLessor;
        this.lastNameOfLessor = lastNameOfLessor;
        this.phoneNameOfLessor = phoneNameOfLessor;
        this.mailNameOfLessor = mailNameOfLessor;
        this.roomNumber = roomNumber;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.totalPrise = totalPrise;
        this.hotel = hotel;
    }
};