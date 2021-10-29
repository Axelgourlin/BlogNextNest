export interface Admin {
  admin_id?: number;
  admin_name?: string;
  admin_password?: string;
  role?: AdminRole;
}

export enum AdminRole {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',
  EDITOR = 'editor',
  USER = 'user',
}
