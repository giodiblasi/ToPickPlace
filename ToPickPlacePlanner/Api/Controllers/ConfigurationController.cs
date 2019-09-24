using System.Threading.Tasks;
using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/configuration")]
    public class ConfigurationController : Controller
    {
        private IConfigurationRepository configurationRepository;

        public ConfigurationController(IConfigurationRepository repo){
            configurationRepository = repo;
        }

        [Route("/")]
        [HttpGet]
        public async Task<IActionResult> Index(){
               var configuration = await configurationRepository.GetConfiguration();
               return View(configuration);
        }

        [Route("/")]
        [HttpPost]
        public async  Task<IActionResult> Index(Configuration configuration){
            await configurationRepository.SaveConfiguration(configuration);
            return await Index();
        }

    }
}
