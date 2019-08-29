using System.Collections.Generic;

namespace Domain.Models{
    public class AssignSeatsRequest{
        public SeatsMap Map {get;set;}
        public IEnumerable<Attendee> Attendees {get;set;}
        public IEnumerable<Topic> Topics {get;set;}
    }
}