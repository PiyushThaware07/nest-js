import { Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { RoleGuard } from "../role.guard";
import { SetMetadata } from '@nestjs/common';


export const Permission = (permission: string) => SetMetadata('permission', permission);



@Controller("course")
@UseGuards(RoleGuard)
export class CourseController {
    @Get()
    findAll() {
        return "find all";
    }

    @Get(":id")
    @Permission("find-course")
    findById(@Param("id") id: string) {
        return `find by id : ${id}`
    }


    @Put(":id")
    updateById(@Param("id") id: string) {
        return `update by id : ${id}`
    }

    @Delete(":id")
    deleteById(@Param("id") id: string) {
        return `delete by id : ${id}`
    }

    @Post()
    create() {
        return "create";
    }
}