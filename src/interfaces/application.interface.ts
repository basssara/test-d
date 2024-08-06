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

export interface SendApplicationResponse {
  fullName: string;
  pinfl: string;
  birthPlace: Date;
  nationality: string;
  citizenship: string;
  temporaryRegistration: string;
  permanentRegistration: string;
}

/**
 * Шахс маълумотлари ўзгаргани ҳақида ахборот (ФХДЁ берган бўйича)
Шахсни фуқароликга кириш/чиқиш маълумотлари (агар бўлса)
Шахснинг фарзандлари, турмуш ўртоғи, иш фаолияти.
Сўровнома яратиш учун қўшимча зарур бўлган маълумотлар.

 */
