using AutoMapper;
using CV_backend.Core.Context;
using CV_backend.Core.DTOs.Company;
using CV_backend.Core.DTOs.Job;
using CV_backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;
        public JobController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD

        // Create
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateJob([FromBody] JobCreateDTO dto)
        {
            Job newJob = _mapper.Map<Job>(dto);
            await _context.Jobs.AddAsync(newJob);
            await _context.SaveChangesAsync();

            return Ok("Job created succesfully");
        }

        // Read
        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<IEnumerable<JobGetDTO>>> GetJobs()
        {
            var jobs = await _context.Jobs.Include(job => job.Company).ToListAsync();
            var convertedJobs = _mapper.Map<IEnumerable<JobGetDTO>>(jobs);

            return Ok(convertedJobs);
        }

        // Read (Get by ID)
        //[HttpGet]
        //[Route("get/{id}")]

        // Update

        // Delete
    }
}
