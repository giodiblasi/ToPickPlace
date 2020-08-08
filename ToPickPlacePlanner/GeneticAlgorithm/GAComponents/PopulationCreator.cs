using System;
using System.Collections.Generic;

namespace GeneticAlgorithm.GAComponents{
    public interface IPopulationCreator<T>
    {
        IEnumerable<T[]> FirstGeneration(T[] genes, int poulationSize);
    }

    public class RandomPopulationCreator<T> : IPopulationCreator<T>
    {
        private Random random;

        public RandomPopulationCreator(){
            random = new Random();
        }
        public IEnumerable<T[]> FirstGeneration(T[] genes, int poulationSize)
        {
            var population = new List<T[]>();
            for(var i = 0; i<poulationSize; i++){
                var individual = new T[genes.Length];
                var genesList = new List<T>(genes);
                for(var k=0; k<genes.Length; k++){
                    
                    var index = random.Next(genesList.Count);
                    
                    var gene = genesList[index];
                    genesList.RemoveAt(index);
                    individual[k] = gene;
                }
                population.Add(individual);
            }
            return population;
        }
    }
}