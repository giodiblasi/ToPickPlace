using System.Threading.Tasks;
using Domain.Models;
using Domain.Repositories;
using Google.Cloud.Firestore;

namespace Infrastructure.Repositories{

    public class FirestoreConfigurationRepository : IConfigurationRepository
    {
        private CollectionReference configurations;
        private ConfigurationConverter configurationConverter;
        public FirestoreConfigurationRepository(){
            configurations = FirestoreDb
                            .Create("topickplace")
                            .Collection("Configurations");
            configurationConverter = new ConfigurationConverter();
        }
        public Task<Configuration> GetConfiguration()
        {
            return configurations
            .Document("factory")
            .GetSnapshotAsync()
            .ContinueWith(result=>{
                var data = result.Result;
                return configurationConverter.ToModel(data.Id, data.ToDictionary());
            });
        }

        public Task SaveConfiguration(Configuration configuration)
        {
            return configurations
            .Document("factory")
            .SetAsync(configurationConverter.ToFirestore(configuration));
        }
    }
}