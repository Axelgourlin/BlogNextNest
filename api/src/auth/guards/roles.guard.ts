import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { Admin } from 'src/admin/models/admin.interface';
import { AdminService } from 'src/admin/services/admin.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @Inject(forwardRef(() => AdminService))
    private adminService: AdminService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();

    const admin: Admin = request.user.admin;

    return this.adminService.findOne(admin.admin_id).pipe(
      map((admin: Admin) => {
        const hasRole = () => roles.indexOf(admin.role) > -1;
        let hasPermission: boolean = false;

        if (hasRole()) hasPermission = true;
        return admin && hasPermission;
      }),
    );
  }
}
