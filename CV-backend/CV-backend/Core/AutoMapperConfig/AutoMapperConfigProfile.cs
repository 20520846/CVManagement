using AutoMapper;
using CV_backend.Core.DTOs.Company;
using CV_backend.Core.Entities;

namespace CV_backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            // Company
            CreateMap<CompanyCreateDTO, Company>();
            CreateMap<Company, CompanyGetDTO>();
            // Job

            // Candidate
        }
    }
}
