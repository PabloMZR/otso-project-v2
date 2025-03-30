import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { v4 as uuid } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { Repository } from "typeorm";
import e from "express";

@Injectable()
export class EmployeesService {
  
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string ) {
    const employee = this.employeeRepository.findOneBy({ 
      employeeId: id as any
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id as any,
      ...updateEmployeeDto,
    });

    if (!employeeToUpdate) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: string) {
    const result = await this.employeeRepository.delete({ employeeId: id as "string" });

    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    return {
      message: `Producto con ID: ${id} eliminado`,
    };
  }
}
