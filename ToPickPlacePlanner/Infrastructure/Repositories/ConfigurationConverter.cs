using System;
using System.Collections.Generic;
using Domain.Models;

namespace Infrastructure.Repositories{
    public class ConfigurationConverter{
        public Configuration ToModel(String id, Dictionary<string, object> map) { 
            return new Configuration(){
                EliteSize = (int) (long)map["eliteSize"],
                MaxGenerations = (int) (long)map["maxGenerations"],
                MutationProbability = (decimal) map["mutationProbability"],
                PopulationSize = (int) (long)map["populationSize"],
                SolutionPrecision = (float) (double)map["solutionPrecision"],
            };
        }

        public Dictionary<string, object> ToFirestore(Configuration configuration){
            return new Dictionary<string, object>{
                {"eliteSize", configuration.EliteSize},
                {"maxGenerations", configuration.MaxGenerations},
                {"mutationProbability", configuration.MutationProbability},
                {"populationSize", configuration.PopulationSize},
                {"solutionPrecision", configuration.SolutionPrecision}
            };
        }
    }
}