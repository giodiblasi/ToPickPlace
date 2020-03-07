using System.Globalization;
using Domain.Repositories;
using Domain.UseCases;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSwaggerDocument();
            services.AddSingleton<IFindSolution, FindSolution>();
            services.AddSingleton<IRestoreConfiguration, RestoreConfiguration>();
            services.AddSingleton<IConfigurationRepository, FirestoreConfigurationRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
                //app.UseHttpsRedirection();
            }
            app.UsePathBase(new Microsoft.AspNetCore.Http.PathString("/planner"));
            SetupCulture();

            app.UseOpenApi(c=>{
                // c.Path = $"/planner{c.Path}";
            });
            app.UseSwaggerUi3(c=>{
                // c.Path="/planner/swagger";
                // c.SwaggerRoutes.Add(new NSwag.AspNetCore.SwaggerUi3Route("plannerSwagger","/planner/swagger/v1/swagger.json"));
            });
            app.UseMvc();
        }

        private void SetupCulture(){
            var cultureInfo = new CultureInfo("en-US");
            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
        }
    }
}
