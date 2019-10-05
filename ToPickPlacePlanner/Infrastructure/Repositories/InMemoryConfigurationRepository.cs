using System.Threading.Tasks;
using Domain.Models;
using Domain.Repositories;

namespace Infrastructure.Repositories{
    public class InMemoryConfigurationRepository : IConfigurationRepository{
        private Configuration configuration;
        public  InMemoryConfigurationRepository(){
            configuration = new Configuration{
                EliteSize = 100,
                MutationProbability = 1,
                PopulationSize = 5000,
                MaxGenerations = 1000,
                SolutionPrecision = 1
            };
        }

        public Task<Configuration> GetConfiguration() => Task.FromResult(configuration);

        public Task SaveConfiguration(Configuration configuration){
            this.configuration = new Configuration(){
                EliteSize = configuration.EliteSize,
                MaxGenerations = configuration.MaxGenerations,
                MutationProbability = configuration.MutationProbability,
                PopulationSize = configuration.PopulationSize,
                SolutionPrecision = configuration.SolutionPrecision
            };
            return Task.CompletedTask;
        }
    }

}