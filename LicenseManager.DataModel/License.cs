using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LicenseManager.DataModel
{
    public class License
    {
        public Guid Id { get; set; }

        [Required]
        public string LicenseKey { get; set; }
        public string MachineCode { get; set; }
        public DateTime? DateIssued { get; set; }

        public virtual Employee IssuedBy { get; set; }

    }
}
