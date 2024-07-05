using Autofac;
using Autofac.Integration.WebApi;
using Common.Logging;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using Swashbuckle.Application;
using System;
using System.Web.Http;
using BetterYouApi;
using BetterYouApi.Configuration;
using BetterYouApi.Filters;
using BetterYouApi.Logging;

[assembly: OwinStartup(typeof(Startup))]

namespace BetterYouApi
{
    /// <summary>
    /// 
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// 
        /// </summary>
        public static DateTime ApplicationStartupTime;
        /// <summary>
        /// 
        /// </summary>
        protected readonly Action<ContainerBuilder> ApplyRegistrationOverridesAction;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="applyRegistrationOverridesAction"></param>
        public Startup(Action<ContainerBuilder> applyRegistrationOverridesAction)
        {
            ApplyRegistrationOverridesAction = applyRegistrationOverridesAction ?? (doNothing => { });
        }

        /// <summary>
        /// 
        /// </summary>
        public Startup() : this(null)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="app"></param>
        protected static void ConfigureLogging(IAppBuilder app)
        {
            new LoggingConfig().RegisterNLog();
            app.Use<LoggerMiddleware>();
            app.Use<TrackingIdMiddleware>();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="app"></param>
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            try
            {
                ConfigureLogging(app);
                app.Use<LoggerMiddleware>();
                var config = new HttpConfiguration();

                // Enable CORS
                app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

                //ConfigureDiagnosticsTracingForWebapi(config);
                ConfigureSerialization(config);
                config.MapHttpAttributeRoutes();

                var swaggerConfig = new SwaggerConfig(config);
                swaggerConfig.Register();

                ConfigureAutofac(app, config);
                ConfigureWebApi(app, config);
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(GetType()).Error(ex);
                throw;
            }
            ApplicationStartupTime = DateTime.Now;
            LogManager.GetLogger(GetType()).Info("API Start-up Complete");
        }

        private void ConfigureAutofac(IAppBuilder app, HttpConfiguration config)
        {
            var builder = new ContainerBuilder();

            builder.RegisterWebApiFilterProvider(config);

            //builder.RegisterType<OwinHelper>().InstancePerLifetimeScope();
            // allow injection of the request to facilitate the OwinHelper
            builder.RegisterHttpRequestMessage(config);

            builder.RegisterModule(new AutofacModule());
            ApplyRegistrationOverridesAction.Invoke(builder);

            var container = builder.Build();

            app.UseAutofacMiddleware(container);

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static void ConfigureWebApi(IAppBuilder app, HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "swagger_root",
                routeTemplate: "",
                defaults: null,
                constraints: null,
                handler: new RedirectHandler(message => message.RequestUri.ToString(), "swagger")
            );
            config.Filters.Add(new ModelContentFilter());
            config.Filters.Add(new ValidateModelFilter());
            config.Filters.Add(new ApiAuthorizeFilter(new EnvironmentService()));
            app.UseAutofacWebApi(config);
            app.UseWebApi(config);
        }

        private static void ConfigureSerialization(HttpConfiguration config)
        {
            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            var xml = config.Formatters.XmlFormatter;
            xml.UseXmlSerializer = true;
        }
    }
}
