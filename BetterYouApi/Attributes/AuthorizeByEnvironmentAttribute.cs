using System;

namespace BetterYouApi.Attributes
{
    public class AuthorizeByEnvironmentAttribute: Attribute
    {
        public string ProductionRoles { get; set; }
        public string NonProductionRoles { get; set; }
    }
}