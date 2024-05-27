using Common.Logging;
using Common.Logging.Configuration;
using Common.Logging.NLog;
using Common.Logging.Simple;

namespace BetterYouApi.Configuration
{
    /// <summary>
    /// 
    /// </summary>
    public class LoggingConfig
    {
        /**
         * This method was enhanced to support environment-specific configuration files. This
         * is done as follows: 
         * (1.) Use the value of the WEB_SERVER_TIER environment variable,
         * (2.) Look for the existence of a file: configFileName.WEB_SERVER_TIER (e.g., ~/NLog.config.local_dev),
         * (3.) If the environment-specific file does not exist, then fall-back to configFileName (e.g., ~/NLog.config)
         **/

        /// <summary>
        /// 
        /// </summary>
        /// <param name="configFileName"></param>
        public void RegisterNLog(string configFileName = "~/NLog.config")
        {
            var props = new NameValueCollection
            {
                ["showDateTime"] = "true",
                ["dateFormat"] = "yyyy-MM-dd HH:mm:ss.fff",
                ["configType"] = "FILE",
                ["configFile"] = configFileName
            };

            LogManager.Adapter = new NLogLoggerFactoryAdapter(props);

            LogManager.GetLogger<LoggingConfig>().Info("NLog configuration file=" + configFileName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logLevel"></param>
        public void RegisterConsole(string logLevel = "DEBUG")
        {
            var props = new NameValueCollection
            {
                ["level"] = logLevel,
                ["showLogName"] = "true",
                ["showDataTime"] = "true",
                ["dateTimeFormat"] = "yyyy/MM/dd HH:mm:ss:fff"
            };

            LogManager.Adapter = new ConsoleOutLoggerFactoryAdapter(props);
        }
    }
}