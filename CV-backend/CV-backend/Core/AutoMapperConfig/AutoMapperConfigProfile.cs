using AutoMapper;
using CV_backend.Core.DTOs.Candidate;
using CV_backend.Core.DTOs.Company;
using CV_backend.Core.DTOs.Job;
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
            CreateMap<JobCreateDTO, Job>();
            CreateMap<Job, JobGetDTO>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name));
            
            // Candidate
            CreateMap<CandidateCreateDTO, Candidate>();
            CreateMap<Candidate, CandidateGetDTO>()
                .ForMember(dest => dest.JobTitle, opt => opt.MapFrom(src => src.Job.Title));
        }
    }
}
