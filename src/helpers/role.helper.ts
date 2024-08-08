import { AccessRoles, AccessRolesInDB } from 'enums/roles.enum';

export const roleConvert = (role: string) => {
  switch (role) {
    case AccessRolesInDB.ADMIN:
      return AccessRoles.ADMIN;
    case AccessRolesInDB.OPERATOR:
      return AccessRoles.OPERATOR;
    case AccessRolesInDB.DOCUMENT:
      return AccessRoles.DOCUMENT;
    case AccessRolesInDB.ID_CARD:
      return AccessRoles.ID_CARD;
    case AccessRolesInDB.TEMPORARY_PERMAMENT_REGISTRATION:
      return AccessRoles.TEMPORARY_PERMAMENT_REGISTRATION;
  }
};
