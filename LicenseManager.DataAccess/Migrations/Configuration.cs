using System.Data.Entity.Validation;
using System.Text;
using LicenseManager.DataModel;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LicenseManager.DataAccess.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<LicenseManager.DataAccess.LicenseManagerDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(LicenseManager.DataAccess.LicenseManagerDbContext context)
        {
                try
                {
            var manager = new UserManager<ApplicationUser>(
                 new UserStore<ApplicationUser>(
                     new LicenseManagerDbContext()));

            // Create 4 test users:
            for (int i = 0; i < 4; i++)
            {
                var user = new ApplicationUser()
                {
                    UserName = string.Format("User{0}", i.ToString()),
                    FirstName = string.Format("Test {0}", i.ToString()),
                    LastName = string.Format("User {0}", i.ToString())
                };
                manager.Create(user, string.Format("Password{0}", i.ToString()));
            }

                }
                catch (DbEntityValidationException ex)
                {
                    var sb = new StringBuilder();

                    foreach (var f in ex.EntityValidationErrors)
                    {
                        sb.AppendFormat("{0} failed validation" + Environment.NewLine, f.Entry.Entity.GetType());
                        foreach (var vE in f.ValidationErrors)
                        {
                            sb.AppendFormat("- {0} : {1}", vE.PropertyName, vE.ErrorMessage);
                            sb.AppendLine();

                        }
                    }

                    throw new Exception(sb.ToString());
                }
        }
    }
}
