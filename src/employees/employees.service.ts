import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';

@Injectable()
export class EmployeesService {
  private readonly employees:CreateEmployeeDto [] = [{
    name: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890'
  },
  {
    name: 'Jane',
    lastName: 'Doe',
    phoneNumber: '1234567890'
  }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    this.employees.push(createEmployeeDto)
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
