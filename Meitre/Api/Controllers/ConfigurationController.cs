using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/configuration")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private IConfigurationRepository configurationRepository;

        public ConfigurationController(IConfigurationRepository repo){
            configurationRepository = repo;
        }

        [Route("/")]
        [HttpGet]
        public async Task<ActionResult<Configuration>> GetConfiguration() =>
                await configurationRepository.GetConfiguration();

        [Route("/")]
        [HttpPost]
        public async  Task<ActionResult> SaveConfiguration(Configuration configuration){
            await configurationRepository.SaveConfiguration(configuration);
            return Ok();
        }

    }
}
