import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { Admin } from 'src/admin/models/admin.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(admin: Admin): Observable<string> {
    return from(this.jwtService.signAsync({ admin }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePassword(password: string, passwordHash): Observable<any | boolean> {
    return of<any | boolean>(bcrypt.compare(password, passwordHash));
  }
}
