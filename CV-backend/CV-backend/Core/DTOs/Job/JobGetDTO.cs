using CV_backend.Core.Enums;

namespace CV_backend.Core.DTOs.Job
{
    public class JobGetDTO
    {
        public long ID { get; set; }
        public string Title { get; set; }
        public JobLevel Level { get; set; }
        public long CompanyID { get; set; }
        public string CompanyName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
