import { RecordStatuses } from "entities";

export interface ApplicationModel {
  applicationId: number;
  serviceId: string;
  fullName: string;
  amount: number;
  pinfl: string;
}

export interface SendApplicationRequest {
  serviceId: string;
  fullName: string;
  pinfl: string;
}

export interface UpdateApplicationRequest {
  serviceId: string;
  fullName: string;
  pinfl: string;
}

export interface SendApplicationResponse {
  fullName: string;
  pinfl: string;
  birthPlace: Date;
  nationality: string;
  citizenship: string;
  temporaryRegistration: string;
  permanentRegistration: string;
}
interface Applications {
  id: string
  pinfl: string
  amount: number
  applicationStatus: string
}
interface User {
  id: string;
  status: RecordStatuses;
  pinpp: string;
  serialNumber: string;
  roles: string[];
  login: string;
  password: string;
  services: Services[]
}
interface Facility {
  id: string;
  facilityName: string;
  user: User;
}

interface Districts {
  id: string;
  districtName: string;
  facility: Facility;
}
interface District {
  id: string;
  regionName: string;
  districts: Districts[];
}

export interface FindApplicationResponse {
  data: District[],
  amount: number
}

interface Services {
  id: string,
  serviceName: string,
  applications: Applications[],
}
/**
 * Шахс маълумотлари ўзгаргани ҳақида ахборот (ФХДЁ берган бўйича)
Шахсни фуқароликга кириш/чиқиш маълумотлари (агар бўлса)
Шахснинг фарзандлари, турмуш ўртоғи, иш фаолияти.
Сўровнома яратиш учун қўшимча зарур бўлган маълумотлар.

 */
