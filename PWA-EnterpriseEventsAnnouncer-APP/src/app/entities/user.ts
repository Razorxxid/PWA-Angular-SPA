export class User {
    name: string;
    lastname: string;
    birthdate: Date;
    affiliate_number: number;
    email: string;
    password: string;

    constructor(name: string, lastname: string, birthdate: Date, affiliate_number: number, email: string, password: string) {
        this.name = name;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.affiliate_number = affiliate_number;
        this.email = email;
        this.password = password;
    }
}
