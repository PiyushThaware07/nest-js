import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { RoleGuard } from "../role.guard";
import { UserModule } from "../user/user.module";

@Module({
    imports: [UserModule],
    controllers: [CourseController],
    providers: [RoleGuard]
})

export class CourseModule {
    constructor() {
        console.log("course module");
    }
}