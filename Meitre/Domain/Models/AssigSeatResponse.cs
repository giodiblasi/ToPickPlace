using System.Collections.Generic;

namespace Domain.Models{
    public class AssignSeatsResponse{
        public IEnumerable<int> Solution{get;set;}
        public int Score {get;set;}
    }
}