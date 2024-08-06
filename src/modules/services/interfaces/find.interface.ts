export interface FindServiceRequest {
  id: string;
}

export interface FindServiceRsponse {
  id: string;
  serviceName: string;
  userId?: string;
}
