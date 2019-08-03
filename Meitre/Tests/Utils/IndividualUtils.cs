using Xunit;

namespace Tests.Utils{
    public static class IndividualUtils{
         public  static void AssertIndividualEqual(int[] individualA, int[] individualB){
            if(individualA.Length != individualB.Length) Assert.True(false);
            for(int i=0; i<individualA.Length;i++){
                if(individualA[i]!=individualB[i]) Assert.True(false);
            }
            Assert.True(true);
        }
    }
}