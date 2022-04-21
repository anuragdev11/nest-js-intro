import { Injectable, NotFoundException} from "@nestjs/common";
import {Product} from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';


@Injectable()
export class ProductService {
     private products: Product[] = [];

     constructor(@InjectModel('Product') private readonly productModel : Model<Product>){} 

     async insertProduct(title: string, desc: string, price: number) {
         const newProduct= new this.productModel({
            title: title, 
            description: desc, 
            price: price
        });
        const result = await newProduct.save();
        return result.id as string;
     }

     async getProducts(){
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id, 
            title: prod.title, 
            description: prod.description, 
            price: prod.price
        }));
     }

     async getSingleProduct(prodId:string){
         const prod=await this.findProduct(prodId);
         return {id:prod.id, title:prod.title, description:prod.description, price:prod.price};
     }

     private async findProduct(prodId:string): Promise<Product>{
        try{
            const product= await this.productModel.findById(prodId).exec();
            if(!product){
                throw new NotFoundException('Product Not Found.');
            }

            return product;
        }
        catch(err){
            throw new NotFoundException("Product Not Found");
        }
     }


     async updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number){
         const updatedProduct = await this.findProduct(prodId);
         if(prodTitle){
             updatedProduct.title=prodTitle;
         }
         if(prodDesc){
             updatedProduct.description=prodDesc;
         }
         if(prodPrice){
             updatedProduct.price=prodPrice;
         }
         updatedProduct.save();
     }

    async removeProduct(prodId:string){
        const result=await this.productModel.deleteOne({_id:prodId}).exec();
        if(!result.deletedCount){
            throw new NotFoundException("Product to be deleted not found.");
        }
     }

}