using System;
using System.Collections.Generic;
using System.Linq;

namespace GeneticAlgorithm.GAComponents{
    public interface IMutator<T>
    {
        IEnumerable<T[]> Mutate(IEnumerable<T[]> indivudual, double mutationProbability);
    }

    public class Mutator<T> : IMutator<T>
    {
        private Random random;
        private IIndividualGenesPoint genesPoint;
        
        public Mutator(IIndividualGenesPoint genesPoint){
            this.genesPoint = genesPoint;
            random = new Random();
        }
        
        public IEnumerable<T[]> Mutate(IEnumerable<T[]> individuals, double mutationProbability)
        {
            var individualSize = individuals.First().Count();
            var mutated = new List<T[]>(individuals);
            mutated.ToList().ForEach(individual=>{
                DoWithProbabiility(mutationProbability,
                    ()=>ExchangeGenes(individual,
                                new Tuple<int,int>(genesPoint.GetPoint(individualSize-1),
                                                   genesPoint.GetPoint(individualSize-1))),
                    ()=>{}
                );
            });
            return mutated;
        }

        private void ExchangeGenes(T[] individual, Tuple<int,int> indexToExchange){
            if(indexToExchange.Item1 == indexToExchange.Item2) return;
            var gene = individual[indexToExchange.Item1];
            individual[indexToExchange.Item1] = individual[indexToExchange.Item2];
            individual[indexToExchange.Item2] = gene;
        }

        private void DoWithProbabiility(double probability, Action onSuccess, Action onFail){
            var value = random.Next(1, 100);
            if(value < probability * 100) onSuccess();
            else onFail();
        }
    }

}