import { AccessRoles, Roles } from 'enums/roles.enum';

export const roleConvert = (role: string) => {
  switch (role) {
    case Roles.ADMIN:
      return AccessRoles.ADMIN;
    case Roles.OPERATOR:
      return AccessRoles.OPERATOR;
    case Roles.DOCUMENT:
      return AccessRoles.DOCUMENT;
    case Roles.ID_CARD:
      return AccessRoles.ID_CARD;
    case Roles.TEMPORARY_PERMAMENT_REGISTRATION:
      return AccessRoles.TEMPORARY_PERMAMENT_REGISTRATION;
  }
};
