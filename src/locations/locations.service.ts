import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { DeepPartial, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto as DeepPartial<Location>);
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationId: id as any,
    })
    if (!location) throw new NotFoundException(`Location not found`);
  }
  
  update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = this.locationRepository.preload({
      locationId: id as any,
      ...updateLocationDto,
    })
    return location
  }

  remove(id: number) {
    return this.locationRepository.delete({ locationId: id as any })
  }
}
