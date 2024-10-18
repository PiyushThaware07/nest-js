import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import * as path from 'path';
import { PermissionModule } from './module/permission/permission.module';
import { CourseModule } from './module/course/course.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      password: "root",
      database: "graphql",
      host: "localhost",
      port: 5432,
      entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')], // Ensure your entities are defined correctly
      synchronize: true,
    }),

    UserModule,
    RoleModule,
    PermissionModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log("app module initialized");
  }
}
