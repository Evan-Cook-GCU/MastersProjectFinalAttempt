using Autofac;
using Autofac.Integration.WebApi;
using System.Reflection;
using System.Web.Http;
using BetterYouApi.Filters;
using Module = Autofac.Module;
using System;

namespace BetterYouApi
{
    /// <summary>
    /// 
    /// </summary>
    public class AutofacModule : Module
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="builder"></param>
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<RequireHttpsFilter>().AsWebApiAuthenticationFilterFor<ApiController>();
            builder.RegisterType<ExceptionHandlerFilter>().AsWebApiExceptionFilterFor<ApiController>();
            builder.RegisterType<EnvironmentService>().AsImplementedInterfaces();
        }
    }
}