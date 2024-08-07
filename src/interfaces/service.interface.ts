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
