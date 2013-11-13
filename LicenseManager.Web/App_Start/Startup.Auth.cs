using System;
using System.Collections.Generic;
using System.Linq;
using LicenseManager.DataAccess;
using LicenseManager.DataModel;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using LicenseManager.Web.Providers;

namespace LicenseManager.Web
{
    public partial class Startup
    {
        static Startup()
        {
            PublicClientId = "self";

            //http://stackoverflow.com/questions/18297052/asp-net-identity-how-to-set-target-db
            //UserManagerFactory = () => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>());
            UserManagerFactory = () => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new LicenseManagerDbContext()));

            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId, UserManagerFactory),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                AllowInsecureHttp = true
            };
        }

        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static Func<UserManager<ApplicationUser>> UserManagerFactory { get; set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider

            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
            //    LoginPath = new PathString("/api/Account/Login")
            //});

            app.UseExternalSignInCookie();
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //    consumerKey: "",
            //    consumerSecret: "");

            //app.UseFacebookAuthentication(
            //    appId: "",
            //    appSecret: "");

            //app.UseGoogleAuthentication();
        }
    }
}
