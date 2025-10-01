import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from 'nestjs-throttler';
import { APP_GUARD } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { TagsModule } from './tags/tags.module';
import { NewsModule } from './news/news.module';
import { MediaModule } from './media/media.module';
import { NewsGalleryModule } from './news-gallery/news-gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database') as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot({
      ttl: 60000, // 1 minute
      limit: 10, // 10 requests per minute per IP
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    ProductCategoriesModule,
    ProductsModule,
    CategoryModule,
    TagsModule,
    NewsModule,
    MediaModule,
    NewsGalleryModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}