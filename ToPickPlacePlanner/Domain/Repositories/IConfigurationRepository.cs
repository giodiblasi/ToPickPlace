using System.Threading.Tasks;
using Domain.Models;

namespace Domain.Repositories{
    public interface IConfigurationRepository
    {
        Task<Configuration> GetConfiguration();
        Task SaveConfiguration(Configuration configuration);
    }
}