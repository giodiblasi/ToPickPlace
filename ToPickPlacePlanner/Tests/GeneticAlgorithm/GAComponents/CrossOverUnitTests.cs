using System.Collections.Generic;
using System.Linq;
using GeneticAlgorithm.GAComponents;
using Tests.Utils;
using Xunit;

namespace Tests.GeneticAlgorithm.GAComponents{
    public class DefinedPointSelector : IIndividualGenesPoint
    {
        private int[] points;
        private int index = 0;
        public DefinedPointSelector(int[] points){
            this.points = points;
        }
        public int GetPoint(int maxValue)
        {
            return points.ElementAt(index++);
        }
    }
    public class CrossOverUnitTests{
        
        [Fact]
        public void ShouldGenerateOffspring(){
            var sut = new DavisOrderCrossOver<int>(new DefinedPointSelector(new int[]{2,2}));
            var parents = new List<int[]>{
               new []{1,2,3,4,5,6}, 
               new []{3,6,5,2,1,4},
            };
            var offspring = sut.Cross(parents);
            IndividualUtils.AssertIndividualEqual(offspring.First(), new []{6,5,3,4,2,1});
        }

        [Fact]
        public void ShouldGetParentBIfSize0(){
            var sut = new DavisOrderCrossOver<int>(new DefinedPointSelector(new int[]{2,0}));
            var parents = new List<int[]>{
               new []{1,2,3,4,5,6}, 
               new []{3,6,5,2,1,4},
            };
            var offspring = sut.Cross(parents);
            IndividualUtils.AssertIndividualEqual(offspring.First(), new []{3,6,5,2,1,4});
        }

        [Fact]
        public void ShouldNotGenerateOffspringWithOneParent(){
            var sut = new DavisOrderCrossOver<int>(new ConstantIndividualGenesPoint(3));
            var parents = new List<int[]>{
               new []{1,2,3,4,5,6} 
            };
            var offspring = sut.Cross(parents);
            Assert.Equal(0, offspring.Count());
        }
    }
}