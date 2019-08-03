using System;
using GeneticAlgorithm.GAComponents;

namespace  GeneticAlgorithm
{
    public class GeneticAlgorithmFactory<T>
    {
        private int PopulationSize = 50;
        private decimal MutationProbability = 0.5M;
        private int eliteSize = 5;
        private double solutionPrecision = 0.05;

        private int maxGenerations = 1000;
        private GeneticAlgorithmFactory(){}

        public static GeneticAlgorithmFactory<T> Factory => new GeneticAlgorithmFactory<T>();
        
        private GeneticAlgorithmFactory<T> CloneAndUpdate(Action<GeneticAlgorithmFactory<T>> update){
            var factory =  new GeneticAlgorithmFactory<T>(){
                MutationProbability = MutationProbability,
                PopulationSize = PopulationSize
            };
            update(factory);
            return factory;
        }

        public GeneticAlgorithmFactory<T> WithPopulationSize(int populationSize) => 
            CloneAndUpdate(factory=>factory.PopulationSize = populationSize);

        public GeneticAlgorithmFactory<T> WithMaxGenerations(int maxGenerations) => 
            CloneAndUpdate(factory=>factory.maxGenerations = maxGenerations);
            
        public GeneticAlgorithmFactory<T> WithMutationProbability(decimal mutationProbability) => 
            CloneAndUpdate(factory=>factory.MutationProbability = mutationProbability);

        public GeneticAlgorithmFactory<T> WithEliteSize(int eliteSize) => 
            CloneAndUpdate(factory=>factory.eliteSize = eliteSize);
        
        public GeneticAlgorithmFactory<T> WithSolutionPrecision(double solutionPrecision) => 
            CloneAndUpdate(factory=>factory.solutionPrecision = solutionPrecision);

        public GeneticAlgorithm<T> Create(IMutator<T> mutator,
            ICrossOver<T> crossOver,
            IPopulationCreator<T> populationCreator,
            Func<T[], int> fitnessFunction) =>
                new GeneticAlgorithm<T>(mutator,
                              crossOver,
                              populationCreator,
                              PopulationSize,
                              MutationProbability,
                              maxGenerations,
                              eliteSize,
                              solutionPrecision,
                              fitnessFunction);

                     
    }
}