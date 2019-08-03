using System.Collections.Generic;
using System.Linq;
using GeneticAlgorithm.GAComponents;
using Tests.Utils;
using Xunit;

namespace Tests.GeneticAlgorithm.GAComponents{
    public class MutationUnitTest{
        
        [Fact]
        public void ShouldMutateIndividual(){
            var sut = new Mutator<int>(new RandonInvididualGenesPoint(3));
            
            var mutated = sut.Mutate(new List<int[]>(){
                new int[] {1,2,3,4}
            }, 1);

            IndividualUtils.AssertIndividualEqual(new int[]{3,2,1,4}, mutated.First());
        }

        [Fact]
        public void ShouldNotMutateIndividual(){
            var sut = new Mutator<int>(new RandonInvididualGenesPoint(3));
            
            var mutated = sut.Mutate(new List<int[]>(){
                new int[] {1,2,3,4}
            }, 0);

            IndividualUtils.AssertIndividualEqual(new int[]{1,2,3,4}, mutated.First());
        }
    }
}