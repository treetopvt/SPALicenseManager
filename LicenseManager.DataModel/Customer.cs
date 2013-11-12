using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LicenseManager.DataModel
{
   public class Customer:ApplicationUser
    {
       public virtual Organization Organization { get; set; }

       public string Address { get; set; }
       public string City { get; set; }
       public string State { get; set; }
       

       public string Zip { get; set; }

       [Phone]
       public string PhoneNumber { get; set; }
    }
}
