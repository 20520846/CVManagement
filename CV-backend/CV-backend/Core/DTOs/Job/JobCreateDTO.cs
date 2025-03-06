using CV_backend.Core.Entities;
using CV_backend.Core.Enums;

namespace CV_backend.Core.DTOs.Job
{
    public class JobCreateDTO
    {
        public string Title { get; set; }
        public JobLevel Level { get; set; }
        public long CompanyID { get; set; }

    }
}
