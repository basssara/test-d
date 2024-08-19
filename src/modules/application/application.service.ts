import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationEntity, RegionEntity, ServiceEntity } from 'entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateApplicationRequest, QueryApplication, FindApplicationResponse } from '@interfaces';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) { }

  async create(data: any) {
    const new_application = await this.applicationRepository.create(data);
    return await this.applicationRepository.save(new_application);
  }

  async findAll(queryDTO: QueryApplication): Promise<FindApplicationResponse> {
    const { page = 1, limit = 10, regionId, districtId, facilityId } = queryDTO;

    // Find regions with relations
    const regions = await this.regionRepository.find({
      relations: {
        districts: {
          facility: {
            user: {
              services: {
                applications: true
              }
            }
          }
        }
      },
      where: {
        id: regionId,
        districts: {
          id: districtId,
          facility: {
            id: facilityId,
            user: {
              services: {
                applications: true
              }
            }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit
    });

    let applicationCount = 0;

    const data = regions.map(region => {
      let regionApplicationCount = 0;
      const districts = region?.districts?.map(district => {
        const facility = district?.facility;
        const services = facility?.user?.services || [];
        const applications = services.flatMap(service => service.applications || []);
        regionApplicationCount += applications.length;
        return {
          id: district?.id,
          districtName: district?.districtName,
          facility: {
            id: facility?.id,
            facilityName: facility?.facilityName,
            user: {
              id: facility?.user?.id,
              status: facility?.user?.status,
              pinpp: facility?.user?.pinpp,
              serialNumber: facility?.user?.serialNumber,
              roles: facility?.user?.accessRoles,
              login: facility?.user?.login,
              password: facility?.user?.password,
              services: services.map(service => ({
                id: service?.id,
                serviceName: service?.serviceName,
                applications: service?.applications?.map(application => ({
                  id: application?.id,
                  pinfl: application?.pinfl,
                  amount: application?.amount,
                  applicationStatus: application?.applicationStatus
                }))
              }))
            }
          }
        };
      });

      applicationCount += regionApplicationCount;

      return {
        id: region?.id,
        regionName: region?.regionName,
        districts
      };
    });

    return {
      data,
      amount: applicationCount
    };
  }


  async findOne(id: string) {
    const application = await this.applicationRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!application || !application.id) {
      throw new NotFoundException('Application not found');
    }

    return {
      message: 'succes',
      data: application,
    };
  }

  async update(
    id: string,
    UpdateApplicationDto: UpdateApplicationRequest,
  ): Promise<void> {
    await this.applicationRepository.update(id, {
      ...UpdateApplicationDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string): Promise<void> {
    await this.applicationRepository.update(id, {
      deletedAt: new Date(),
    });
  }
}
