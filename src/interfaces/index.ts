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
  FindRegionRequest,
  CreateRegionRequest,
  UpdateRegionRequest,
  DeleteRegionRequest,
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
  GetPhotoRequest,
  GetPhotoResponse,
  GetPersonalDataResponse,
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
