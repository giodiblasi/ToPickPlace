using System.Collections.Generic;
using System.Linq;
using GeneticAlgorithm.GAComponents;
using Tests.Utils;
using Xunit;

namespace Tests.GeneticAlgorithm.GAComponents{
    public class CrossOverUnitTests{
        
        [Fact]
        public void ShouldGenerateOffspring(){
            var sut = new OnePointCrossOver<int>(new ConstantIndividualGenesPoint(3));
            var parents = new List<int[]>{
               new []{1,2,3,4,5,6}, 
               new []{5,6,3,4,1,2},
               new []{2,4,3,2,6,5} 
            };
            var offspring = sut.Cross(parents);
            IndividualUtils.AssertIndividualEqual(offspring.First(), new []{1,2,3,5,6,4});
        }

        [Fact]
        public void ShouldNotGenerateOffspringWithOneParent(){
            var sut = new OnePointCrossOver<int>(new ConstantIndividualGenesPoint(3));
            var parents = new List<int[]>{
               new []{1,2,3,4,5,6} 
            };
            var offspring = sut.Cross(parents);
            Assert.Equal(0, offspring.Count());
        }
    }
}