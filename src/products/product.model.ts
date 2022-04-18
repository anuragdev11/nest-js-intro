// export class Product {
//     id: string;
//     title: string;
//     description: string;
//     price: number;

//     constructor(id: string, title: string, desc: string, price: number) {
//         this.id=id;
//         this.title=title;
//         this.price=price;
//         this.description=desc;
//     };
// }

//Equivalent code for above code is as follows in TS.
export class Product{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public price: number
    ){}
}
