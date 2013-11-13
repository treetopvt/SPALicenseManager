using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LicenseManager.DataAccess.Migrations;
using LicenseManager.DataModel;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LicenseManager.DataAccess
{
    public class LicenseManagerDbContext:IdentityDbContext<ApplicationUser>
    {
        /// <summary>
        /// default constructor will use the development SDF Database
        /// </summary>
        public LicenseManagerDbContext()
            : base("DefaultConnection")
        {
           // Database.SetInitializer(new MigrateDatabaseToLatestVersion<LicenseManagerDbContext, Configuration>());   

        }
            //: base("developmentDB"){}

        //called as a static constructor which will configure that database
        static LicenseManagerDbContext()
        {
            Database.SetInitializer<LicenseManagerDbContext>(null);
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<LicenseManagerDbContext, Configuration>());   
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Use singular table names
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            // Disable proxy creation and lazy loading; not wanted in this service context.
            //Configuration.ProxyCreationEnabled = false;
            //Configuration.LazyLoadingEnabled = false;

            //where you add custom configurations for various tables

            //modelBuilder.Configurations.Add(new SessionConfiguration());
            //modelBuilder.Configurations.Add(new AttendanceConfiguration());
            base.OnModelCreating(modelBuilder);
        }

        //DataSets
        DbSet<License> Licenses { get; set; }
        DbSet<Organization> Organizations { get; set; }
    }
}
