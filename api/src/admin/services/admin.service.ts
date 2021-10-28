import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { AdminEntity } from '../models/admin.entity';
import { Admin } from '../models/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  create(admin: Admin): Observable<Admin> {
    return from(this.adminRepository.save(admin));
  }

  findAll(): Observable<Admin[]> {
    return from(this.adminRepository.find());
  }

  findOne(id: number): Observable<Admin> {
    return from(this.adminRepository.findOne(id));
  }

  updateOne(id: number, admin: Admin): Observable<any> {
    return from(this.adminRepository.update(id, admin));
  }

  deleteOne(id: number): Observable<any> {
    return from(this.adminRepository.delete(id));
  }
}
