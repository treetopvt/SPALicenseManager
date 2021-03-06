﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LicenseManager.DataModel;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;

namespace LicenseManager.Web.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        private readonly Func<UserManager<ApplicationUser>> _userManagerFactory;

        public ApplicationOAuthProvider(string publicClientId, Func<UserManager<ApplicationUser>> userManagerFactory)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            if (userManagerFactory == null)
            {
                throw new ArgumentNullException("userManagerFactory");
            }

            _publicClientId = publicClientId;
            _userManagerFactory = userManagerFactory;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (UserManager<ApplicationUser> userManager = _userManagerFactory())
            {
                //var tmp = userManager.FindByName("User1");
                //var t2 = userManager.GetLogins(tmp.UserName);
                userManager.Create(new ApplicationUser() {UserName = "Admin", FirstName="Admin", LastName="User"},"2Bornot2B");

                ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                ClaimsIdentity oAuthIdentity = await userManager.CreateIdentityAsync(user,
                    context.Options.AuthenticationType);
                ClaimsIdentity cookiesIdentity = await userManager.CreateIdentityAsync(user,
                    CookieAuthenticationDefaults.AuthenticationType);
                
                AuthenticationProperties properties = CreateProperties(user.UserName, user.Roles);
                AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
                context.Validated(ticket);
                context.Request.Context.Authentication.SignIn(cookiesIdentity);
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName, ICollection<IdentityUserRole> availableRoles)
        {
            var roleList = availableRoles.Aggregate("", (current, role) => current + (role.Role.Name + ","));
            roleList = roleList.TrimEnd(Convert.ToChar(","));
            roleList = String.IsNullOrEmpty(roleList) ? "user" : roleList;
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName },
                { "roles", roleList }
            };
            return new AuthenticationProperties(data);
        }
    }
}