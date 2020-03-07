using System.Threading.Tasks;
using api.ViewModels;
using Domain.Models;
using Domain.Repositories;
using Domain.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/configuration")]
    public class ConfigurationController : Controller
    {
        private IConfigurationRepository configurationRepository;
        private IRestoreConfiguration restoreConfiguration;

        public ConfigurationController(IConfigurationRepository repo,
                                      IRestoreConfiguration restoreConfiguration){
            configurationRepository = repo;
            this.restoreConfiguration = restoreConfiguration;
        }

        
        [HttpGet]
        public async Task<IActionResult> Index(){
            var configuration = await configurationRepository.GetConfiguration();

            return View(new ConfigurationViewModel(){
                Configuration = configuration
            });
        }

        
        [HttpPost]
        public async  Task<IActionResult> Index(Configuration configuration){
            await configurationRepository.SaveConfiguration(configuration);
            var savedConfiguration = await configurationRepository.GetConfiguration();

            return View(new ConfigurationViewModel(){
                Configuration = savedConfiguration,
                Message = "Configuration saved",
            });
        }

        [Route("restore")]
        [HttpPost]
        public async Task<IActionResult> RestoreConfiguration(){
            await restoreConfiguration.Restore();
            var configuration = await configurationRepository.GetConfiguration();
            return View("Index", new ConfigurationViewModel(){
                Configuration = configuration,
                Message = "Settings Restored to default"
            });
        }

    }
}
