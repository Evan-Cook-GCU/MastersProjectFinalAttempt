using System;

namespace BetterYouApi
{
        public interface IEnvironmentService
        {
            bool Production();

            bool Stage();

            bool Qa(); // the "Quality Assurance" environment

            bool Test();

            bool Ci(); // the "Continuous Integration" environment

            bool Dev();

            bool LocalDev();

            /**
             * Gets the name of the current environment.
             **/
            string Environment();
        }
    
    public class EnvironmentService : IEnvironmentService
    {
        public static readonly string EnvironmentVariableName = "WEB_SERVER_TIER";
        public static readonly string ProductionEnvironmentName = "PRD";
        public static readonly string StageEnvironmentName = "STG";
        public static readonly string QaEnvironmentName = "TST"; // this isn't really a supported .NET environment
        public static readonly string CiEnvironmentName = "CI";
        public static readonly string TestEnvironmentName = "TST";
        public static readonly string DevEnvironmentName = "DEV";
        public static readonly string LocalDevEnvironmentName = "LOCAL_DEV";

        public bool Production()
        {
            return ProductionEnvironmentName.Equals(Environment(), StringComparison.CurrentCultureIgnoreCase);
        }

        public bool Stage()
        {
            return StageEnvironmentName.Equals(Environment(), StringComparison.CurrentCultureIgnoreCase);
        }

        public bool Qa() // the "Quality Assurance" environment
        {
            return QaEnvironmentName.Equals(Environment(), StringComparison.CurrentCultureIgnoreCase);
        }

        public bool Test()
        {
            return TestEnvironmentName.Equals(Environment(), StringComparison.CurrentCultureIgnoreCase);
        }

        public bool Ci() // the "Continuous Integration" environment
        {
            return CiEnvironmentName.Equals(Environment(), StringComparison.CurrentCultureIgnoreCase);
        }

        public bool Dev()
        {
            return DevEnvironmentName.Equals(Environment(), StringComparison.CurrentCultureIgnoreCase);
        }

        public bool LocalDev()
        {
            return LocalDevEnvironmentName.Equals(Environment(), StringComparison.CurrentCultureIgnoreCase);
        }

        public string Environment()
        {
            return System.Environment.GetEnvironmentVariable(EnvironmentVariableName);
        }
    }
}