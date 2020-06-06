using System.Collections.Generic;
using Domain.Models;

namespace Api.Models{
    public class Attendee{
        public string Id{get; set;}
        public List<string> TopicIds{get;set;}
    }

      public class AssignSeatsRequest{
        public SeatsMap Map {get;set;}
        public List<Attendee> Attendees {get;set;}
        public List<Topic> Topics {get;set;}
    }

    public class AssignSeatsResponse{
        public List<string> Solution{get;set;}
        public int Score {get;set;}
    }
}