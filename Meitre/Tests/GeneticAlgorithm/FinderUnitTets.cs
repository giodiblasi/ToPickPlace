using System;
using GeneticAlgorithm;
using GeneticAlgorithm.GAComponents;
using Xunit;

namespace Tests.GeneticAlgorithm{
    public class FinderUnitTests{
        [Fact]
        private void ShouldOrderArray(){
            var array = new []{4,3,2,1};
            Func<int[],int> fitnessFunction = (int[] solution)=> {
                var score=0;
                for(int i=0; i<solution.Length; i++){
                    if(solution[i] == i+1) score++;
                }
                return score;
            };

            var finder = GeneticAlgorithmFactory<int>
                .Factory
                .WithMaxGenerations(10)
                .WithMutationProbability(0)
                .WithPopulationSize(500)
                .WithEliteSize(10)
                .WithSolutionPrecision(0.01)
                .Create(
                    new Mutator<int>(new RandonInvididualGenesPoint()),
                    new OnePointCrossOver<int>(new RandonInvididualGenesPoint()),
                    new RandomPopulationCreator<int>(),fitnessFunction);

                var result = finder.FindSolution(array);
                Assert.True(fitnessFunction(result)>2);
            

        }
    }
}