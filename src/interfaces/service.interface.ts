export interface GetPersonalDataWithPassportRequest {
  doctype: number;
  serialNumber: string;
  dateBirth: Date;
  pinpp: string;
  address: boolean;
  parrents: boolean;
}

export interface GetPersonalDataWithPinflRequest {
  pinpp: number;
  address: boolean;
  parrents: boolean;
}

export interface Person {
  guid: string;
  pinpp: string;
  surnameCirillic: string;
  nameCirillic: string;
  patronymCirillic: string;
  surnameLatin: string;
  nameLatin: string;
  patronymLatin: string;
  surnameEnglish: string;
  nameEnglish: string;
  patronymEnglish: string;
  dateBirth: Date;
  Sex: number;
  Nationality: number;
  Citizenship: number;
  BirthCountry: number;
  BirthRegion: number;
  BirthDistrict: number;
  BirthPlaceLatin: string;
  BirthPlaceEnglish: string;
}

export interface Document {
  documentType: number;
  serialNumber: string;
  issuedBy: string;
  dateIssue: Date;
  dateValid: Date;
  documentStatus: number;
}

export interface Address {
  CadastreNumber: string;
  Country: number;
  Region: number;
  District: number;
  Address: string;
}

export interface Father {
  guid: string;
  pinpp: string;
  surname: string;
  name: string;
  patronym: string;
  dateBirth: Date;
  documentType: number;
  serialNumber: string;
}
export interface Mother {
  guid: string;
  pinpp: string;
  surname: string;
  name: string;
  patronym: string;
  dateBirth: Date;
  documentType: number;
  serialNumber: string;
}

export interface GetPersonalDataResponse {
  person: Person;
  document: Document;
  address?: Address;
  father?: Father;
  mother?: Mother;
}

export interface GetPhotoRequest {
  id: string;
}

export interface GetPhotoResponse {
  bytes: [];
}

export interface GetPersonalDocumentRequest {
  id: string;
}

export interface GetPersonalDocumentResponse {
  documentType: number;
  serialNumber: string;
  issuedBy: string;
  dateIssue: Date;
  dateValid: Date;
  documentStatus: number;
}

export interface ServiceModel {
  serviceName: string;
  userId: string;
}

export interface CreateServiceRequest {
  serviceName: string;
  userId: string;
}

export interface FindServiceRequest {
  id: string;
}

export interface FindServiceRsponse {
  id: string;
  serviceName: string;
  userId?: string;
}

export interface UpdateServiceRequest {
  id: string;
  serviceName: string;
}

export interface DeleteServiceRequest {
  id: string;
}
