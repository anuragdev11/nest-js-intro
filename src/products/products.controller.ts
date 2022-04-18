import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";
@Controller('products')
export class ProductsController{
    constructor(private readonly productService: ProductService){}
    
    //For post requests we need to add products/insert in the url
    @Post('insert')
    addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice : number
    ) {
        const generatedId= this.productService.insertProduct(
            prodTitle, 
            prodDesc, 
            prodPrice
            );
        return {status:200, id: generatedId };  

    }
    

    //For get request to view all data we need to add products/show in the URL.
    @Get('show')
    getAllProducts(){
        return {status:200,data:this.productService.getProducts()};
    }

    @Get(':id')
    getProduct(@Param('id') prodID: string){
        return this.productService.getSingleProduct(prodID);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodID : string,
        @Body('title') prodTitle : string,
        @Body('description') prodDesc : string,
        @Body('price') prodPrice : number
    ){
        this.productService.updateProduct(prodID, prodTitle, prodDesc, prodPrice);
        return {status:200, msg:"Updated Successfully."}       

    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId : string){
        this.productService.removeProduct(prodId);
        return {status:200, msg:"Deleted Successfully."}
    }
}
