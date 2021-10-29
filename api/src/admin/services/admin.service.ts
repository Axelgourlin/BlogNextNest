import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AdminEntity } from '../models/admin.entity';
import { Admin } from '../models/admin.interface';
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private authService: AuthService,
  ) {}

  create(admin: Admin): Observable<Admin> {
    return this.authService.hashPassword(admin.admin_password).pipe(
      switchMap((passwordHash: string) => {
        const newAdmin = new AdminEntity();
        newAdmin.admin_name = admin.admin_name;
        newAdmin.admin_password = passwordHash;
        newAdmin.role = admin.role;

        return from(this.adminRepository.save(newAdmin)).pipe(
          map((admin: Admin) => {
            const { admin_password, ...result } = admin;
            return result;
          }),
          catchError((error) => throwError(error)),
        );
      }),
    );
  }

  findAll(): Observable<Admin[]> {
    return from(this.adminRepository.find()).pipe(
      map((admin) => {
        admin.forEach((v) => delete v.admin_password);
        return admin;
      }),
    );
  }

  findOne(id: number): Observable<Admin> {
    return from(this.adminRepository.findOne(id)).pipe(
      map((admin: Admin) => {
        const { admin_password, ...result } = admin;
        return result;
      }),
    );
  }

  updateOne(id: number, admin: Admin): Observable<any> {
    // delete admin.admin_name;
    // delete admin.admin_password;

    return from(this.adminRepository.update(id, admin));
  }

  updateRoleOfAdmin(id: number, admin: Admin): Observable<any> {
    return from(this.adminRepository.update(id, admin));
  }

  deleteOne(id: number): Observable<any> {
    return from(this.adminRepository.delete(id));
  }

  login(admin: Admin): Observable<string> {
    return this.validateAdmin(admin.admin_name, admin.admin_password).pipe(
      switchMap((admin: Admin) => {
        if (admin) {
          return this.authService
            .generateJWT(admin)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }

  validateAdmin(name: string, password: string): Observable<Admin> {
    return this.findByName(name).pipe(
      switchMap((admin: Admin) =>
        this.authService.comparePassword(password, admin.admin_password).pipe(
          map((match: boolean) => {
            if (match) {
              const { admin_password, ...result } = admin;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }

  findByName(admin_name: string): Observable<Admin> {
    return from(this.adminRepository.findOne({ admin_name }));
  }
}
