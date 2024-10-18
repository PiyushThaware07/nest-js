import { Module } from '@nestjs/common';
import { CommonAuthModule } from './module/auth/common.auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      password: "root",
      database: "testing",
      host: "localhost",
      port: 5432,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
      logger: "file"
    })
    , CommonAuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log("app module")
  }
}
