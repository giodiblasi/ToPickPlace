using Domain.Models;
using Xunit;

namespace Tests.Domain.Models{
 public class SeatsMapUnitTest{
     
     [Fact]
     public void BuildMapFromArray(){
         var map = new SeatsMap(3,4,new int[]{1,2,3,4,5,6,7,8,9,10,11,12});
         Assert.Equal(7,map.Map[1,2]);
         Assert.Equal(12,map.Map[2,3]);
         Assert.Equal(1,map.Map[0,0]);
     }
 }
}