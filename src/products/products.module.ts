import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [EmployeesModule, ProductsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
