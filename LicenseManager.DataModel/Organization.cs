using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LicenseManager.DataModel
{
    public class Organization
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public Customer PointOfContact { get; set; }

        public virtual IList<Customer> Customers { get; set; }
        public virtual IList<License> Licenses { get; set; }

    }
}