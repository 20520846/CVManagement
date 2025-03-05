using AutoMapper;
using CV_backend.Core.Context;
using CV_backend.Core.DTOs.Company;
using CV_backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;
        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD

        // Create
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDTO dto)
        {
            Company newCompany = _mapper.Map<Company>(dto);
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();

            return Ok("Company created succesfully");
        }

        // Read
        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDTO>>> GetCompanies()
        {
            var companies = await _context.Companies.ToListAsync();
            var covertedCompanies = _mapper.Map<IEnumerable<CompanyGetDTO>>(companies);

            return Ok(covertedCompanies);
        }

        // Read (Get by ID)
        [HttpGet]
        [Route("get/{id}")]

        // Update

        // Delete
    }
}
