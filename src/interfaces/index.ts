export type { LoginRequest, LoginResponse } from './auth.interface';
export type {
  UserModel,
  CreateUserRequest,
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  DeleteUserRequest,
} from './user.interface';
export type {
  RegionModel,
  CreateRegionRequest,
  UpdateRegionRequest,
  FindRegionResponse,
} from './region.interface';
export type {
  ServiceModel,
  CreateServiceRequest,
  FindServiceRequest,
  FindServiceRsponse,
  UpdateServiceRequest,
  DeleteServiceRequest,
  GetPersonalDataWithPinflRequest,
  GetPersonalDataWithPassportRequest,
  GetPersonalDataResponse,
  GetPhotoRequest,
  GetPhotoResponse,
  GetPersonalDocumentRequest,
  GetPersonalDocumentResponse,
} from './service.interface';
export type {
  FacilitiesModel,
  CreateFacilityRequest,
  UpdateFacilityRequest,
} from './facilities.interface';
export type {
  ApplicationModel,
  SendApplicationRequest,
  SendApplicationResponse,
  UpdateApplicationRequest,
} from './application.interface';
export type { JwtModel } from './jwt.interface';
export type { AsbtCreateRequest, AsbtCreateResponse } from './asbt.interface';
export type {
  DistrictsModel,
  CreateDistrictRequest,
  UpdateDistrictRequest,
} from './district.interface';
