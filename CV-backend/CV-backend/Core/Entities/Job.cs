using CV_backend.Core.Enums;

namespace CV_backend.Core.Entities
{
    public class Job : BaseEntity
    {
        public string Title { get; set; }
        public JobLevel Level { get; set; }

        //Relations
        public long CompanyID { get; set; }
        public Company Company { get; set; }
        public ICollection<Candidate> Candidates { get; set; }
    }
}
