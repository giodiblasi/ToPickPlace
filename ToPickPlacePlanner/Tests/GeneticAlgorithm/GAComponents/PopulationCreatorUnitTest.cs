using System.Linq;
using GeneticAlgorithm.GAComponents;
using Xunit;

namespace Tests.GeneticAlgorithm.GAComponents{
    public class PopulationCreatorUnitTest{
        private RandomPopulationCreator<int> sut;

        [Fact]
        public void ShouldGeneratePopulation(){
            sut = new RandomPopulationCreator<int>();
            var population = sut.FirstGeneration(new int[]{1,2,3}, 10);
            Assert.Equal(10, population.Count());
            foreach (var individual in population)
            {
                Assert.Equal(6, individual.Sum());
            }

        }
    }
}