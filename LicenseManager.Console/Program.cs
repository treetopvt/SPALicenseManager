using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LicenseManager.DataAccess;

namespace LicenseManager.Console
{
    class Program
    {
        static void Main(string[] args)
        {

            using (var ctx = new LicenseManagerDbContext())
            {
                ctx.Database.CreateIfNotExists();
                var users = ctx.Users.Count();
            }
        }
    }
}
