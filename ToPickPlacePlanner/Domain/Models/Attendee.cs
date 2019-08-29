using System.Collections.Generic;

namespace Domain.Models{
    public class Attendee{
        public int Id{get; set;}
        public IEnumerable<int> TopicIds{get;set;}
    }
}