import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";
@Controller('products')
export class ProductsController{
    constructor(private readonly productService: ProductService){}
    
    //For post requests we need to add products/insert in the url
    @Post('insert')
    async addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice : number
    ) {
        const generatedId= await this.productService.insertProduct(
            prodTitle, 
            prodDesc, 
            prodPrice
            );
        return {status:200, id: generatedId };  

    }
    

    //For get request to view all data we need to add products/show in the URL.
    @Get('show')
    async getAllProducts(){
        const products = await this.productService.getProducts();
        const result = {status: 200, data:[products]};
        return result
    }

    @Get(':id')
    getProduct(@Param('id') prodID: string){
        return this.productService.getSingleProduct(prodID);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodID : string,
        @Body('title') prodTitle : string,
        @Body('description') prodDesc : string,
        @Body('price') prodPrice : number
    ){
        await this.productService.updateProduct(prodID, prodTitle, prodDesc, prodPrice);
        return {status:200, msg:"Updated Successfully."}       

    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId : string){
        await this.productService.removeProduct(prodId);
        return {status:200, msg:"Deleted Successfully."}
    }
}