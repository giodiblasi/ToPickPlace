using System.Collections.Generic;
using Domain.Models;

namespace Api.Models{
    public class Attendee{
        public string Id{get; set;}
        public IEnumerable<string> TopicIds{get;set;}
    }

      public class AssignSeatsRequest{
        public SeatsMap Map {get;set;}
        public IEnumerable<Attendee> Attendees {get;set;}
        public IEnumerable<Topic> Topics {get;set;}
    }

    public class AssignSeatsResponse{
        public IEnumerable<string> Solution{get;set;}
        public int Score {get;set;}
    }
}