import { Injectable, NotFoundException} from "@nestjs/common";
import {Product} from "./product.model";
//import { ProductsModule } from "./products.module";
@Injectable()
export class ProductService {
     private products: Product[] = [];

     insertProduct(title: string, desc: string, price: number) {
        //const prodID=new Date().toString();
        const prodID=Math.random().toString();
         const newProduct= new Product(prodID, title, desc, price);
         this.products.push(newProduct);
         return prodID;
     }

     getProducts(){
         return [...this.products];
     }

     getSingleProduct(prodId:string){
         const prod=this.products.find(ele=>ele.id===prodId);
         if(!prod){
             throw new NotFoundException('Product not found.');
         }
         return {...prod};
     }

     private findProduct(prodId:string): [number, Product]{
        const prodIndex=this.products.findIndex(ele=>ele.id===prodId);
        return [prodIndex, this.products[prodIndex]]
     }


     updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number){
         const [prodIndex, prod]=this.findProduct(prodId);
         const updatedProduct= {...prod};
         if(prodTitle){
             updatedProduct.title=prodTitle;
         }
         if(prodDesc){
             updatedProduct.description=prodDesc;
         }
         if(prodPrice){
             updatedProduct.price=prodPrice;
         }
         this.products[prodIndex]=updatedProduct;
     }

     removeProduct(prodId:string){
         const index=this.findProduct(prodId)[0];
         this.products.splice(index, 1);
     }

}