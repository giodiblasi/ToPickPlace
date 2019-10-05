using System.Threading.Tasks;
using Domain.Models;
using Domain.Repositories;

namespace Domain.UseCases{
    public interface IRestoreConfiguration
    {
        Task Restore();
    }
    public class RestoreConfiguration : IRestoreConfiguration {
        private IConfigurationRepository configurationRepository;
        public RestoreConfiguration(IConfigurationRepository configurationRepository){
            this.configurationRepository = configurationRepository;
        }
        public Task Restore(){
            return configurationRepository.SaveConfiguration(new Configuration(){
                EliteSize = 100,
                MutationProbability = 1.0,
                PopulationSize = 5000,
                MaxGenerations = 1000,
                SolutionPrecision = 1.0
            });
        }
    }
}