using System.Threading.Tasks;
using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace api.Pages
{
    
    public class ConfigurationModel : PageModel
    {
        private IConfigurationRepository repo;

        public ConfigurationModel(IConfigurationRepository configurationRepository){
            repo = configurationRepository;
        }
        
        
        public Configuration configuration {get;set;}

        public async Task OnGetAsync() => configuration = await repo.GetConfiguration();

        public async Task<IActionResult> OnPostAsync(Configuration configuration)
        {
            if (ModelState.IsValid)
            {
                await repo.SaveConfiguration(configuration);
                this.configuration = configuration;
            }
            
            return Page();
        }
    }
}