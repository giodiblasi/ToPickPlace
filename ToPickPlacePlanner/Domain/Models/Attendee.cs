using System.Collections.Generic;

namespace Domain.Models{
    public class Attendee{
        public int IndividualId{get; set;}
        public IEnumerable<string> TopicIds{get;set;}
    }
}