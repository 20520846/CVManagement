using AutoMapper;
using CV_backend.Core.Context;
using CV_backend.Core.DTOs.Candidate;
using CV_backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;
        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDTO dto, IFormFile pdfFile)
        {
            // First => Save pdf to Server
            // Then => save url into our entity

            try
            {
                var fiveMegaByte = 5 * 1024 * 1024;
                var pdfMimeType = "application/pdf";

                if (pdfFile.Length > fiveMegaByte || pdfFile.ContentType != pdfMimeType)
                {
                    return BadRequest("File is not valid");
                }

                var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
                var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "pdfs");

                // Ensure the directory exists
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                var filePath = Path.Combine(directoryPath, resumeUrl);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await pdfFile.CopyToAsync(stream);
                }

                var newCandidate = _mapper.Map<Candidate>(dto);
                newCandidate.ResumeURL = resumeUrl;
                await _context.Candidates.AddAsync(newCandidate);
                await _context.SaveChangesAsync();

                return Ok("Candidate Saved Successfully");
            }
            catch (Exception ex)
            {
                // Log the exception details
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, "An error occurred while processing the file. Details: " + ex.Message);
            }
        }


        // Read
        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDTO>>> GetCandidates()
        {
            var candidates = await _context.Candidates.Include(can => can.Job).ToListAsync();
            var convertedCandidates = _mapper.Map<IEnumerable<CandidateGetDTO>>(candidates);

            return Ok(convertedCandidates);
        }

        // Read (Download PDF File)
        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "pdfs", url);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);

            return file;
        }

        // Read (Get by ID)
        //[HttpGet]
        //[Route("get/{id}")]

        // Update

        // Delete
    }
}
