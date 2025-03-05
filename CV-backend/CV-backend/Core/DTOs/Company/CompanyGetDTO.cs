using CV_backend.Core.Enums;

namespace CV_backend.Core.DTOs.Company
{
    public class CompanyGetDTO
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public CompanySize Size { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
