import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ProductsModule, 
    MongooseModule.forRoot(
    'mongodb+srv://1106shaitansingh:anuragdev11@cluster0.cigue.mongodb.net/test?retryWrites=true&w=majority'
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
