using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeneticAlgorithm.GAComponents;

namespace GeneticAlgorithm
{
    public class GeneticAlgorithm<T>
    {
        private readonly IMutator<T> mutator;
        private readonly ICrossOver<T> crossOver;
        private readonly IPopulationCreator<T> populationCreator;
        private int populationSize;
        private int maxGenerations;
        private decimal mutationProbability;
        private int eliteSize;
        private double solutionPrecision;
        private readonly Func<T[], int> fitnessFunction;
        private readonly Random random = new Random();
        internal GeneticAlgorithm(
            IMutator<T> mutator,
            ICrossOver<T> crossOver,
            IPopulationCreator<T> populationCreator,
            int populationSize,
            decimal mutationProbability,
            int maxGenerations,
            int eliteSize,
            double solutionPrecision,
            Func<T[], int> fitnessFunction)
        {
            this.mutator = mutator;
            this.crossOver = crossOver;
            this.populationCreator = populationCreator;
            this.populationSize = populationSize;
            this.mutationProbability = mutationProbability;
            this.fitnessFunction = fitnessFunction;
            this.maxGenerations = maxGenerations;
            this.eliteSize = eliteSize;
            this.solutionPrecision = solutionPrecision;
        }


        public Task<T[]> FindSolutionAsync(T[] genes) => Task.Run(() => FindSolution(genes));
        
        public T[] FindSolution(T[] genes){
            var individualSize = genes.Length;
            var generationCount=0;
            var generation = populationCreator
                .FirstPopulation(genes, populationSize)
                .MakeIndividuals(fitnessFunction)
                .OrderByDescending(individual=> individual.Score);

            var  winner = generation.First();
            var maxScore = 0;
            
            do{
                generationCount ++;
                maxScore = winner.Score;

                var elite = generation.Take(eliteSize);

                var offspring = mutator
                        .Mutate(crossOver.Cross(elite.Select(s=>s.Value)),mutationProbability)
                        .MakeIndividuals(fitnessFunction);
                
                generation = elite
                                .Union(offspring)
                                .Union(Rescued(generation.Except(elite), populationSize - elite.Count() - offspring.Count()))
                                .OrderByDescending(individual=> individual.Score);
                
                winner  = elite.First();

            }while(Math.Abs(maxScore-winner.Score) > solutionPrecision && generationCount<maxGenerations);
            
            return winner.Value;
        }

        private IEnumerable<Individual<T>> Rescued(IEnumerable<Individual<T>> individuals, int howMany){
            var individualsToRescue = new List<Individual<T>>(individuals);
            var rescued = new List<Individual<T>>();
            for(int i = 0; i<howMany; i++){
                var rescuedIndex = random.Next(individualsToRescue.Count());
                rescued.Add(individualsToRescue.ElementAt(rescuedIndex));
                individualsToRescue.RemoveAt(rescuedIndex);
            }
            return rescued;
        }

    }

    public static class PopulationExtension{
         public static IEnumerable<Individual<T>> MakeIndividuals<T>(this IEnumerable<T[]> population, Func<T[], int> fitnessFunction){
            var individuals = new ConcurrentQueue<Individual<T>>();
            Parallel.ForEach(population, individual => individuals.Enqueue(new Individual<T>(individual, fitnessFunction(individual))));
            return individuals;
        }
    }
}
