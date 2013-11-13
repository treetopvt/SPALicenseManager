using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(LicenseManager.Web.Startup))]

namespace LicenseManager.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //AppDomain.CurrentDomain.SetData("DataDirectory", System.IO.Directory.GetCurrentDirectory() + @"\App_Data\");
            //Console.WriteLine(AppDomain.CurrentDomain.GetData("DataDirectory"));
            //AppDomain.CurrentDomain.SetData("DataDirectory", Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData));
            ConfigureAuth(app);
        }
    }
}
