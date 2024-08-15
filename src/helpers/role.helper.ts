import { AccessRoles, Roles } from 'enums/roles.enum';

export const roleConvert = (role: string) => {
  switch (role) {
    case Roles.SUPER_ADMIN:
      return AccessRoles.SUPER_ADMIN;
    case Roles.ADMIN:
      return AccessRoles.ADMIN;
    case Roles.GET_PERSONAL_INFO:
      return AccessRoles.GET_PERSONAL_INFO;
    case Roles.ID_CARD:
      return AccessRoles.ID_CARD;
    case Roles.TEMPORARY_PERMAMENT_REGISTRATION:
      return AccessRoles.TEMPORARY_PERMAMENT_REGISTRATION;
  }
};
