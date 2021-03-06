using System;
using System.Collections.Generic;
using Domain.Models;
using Domain.UseCases;
using Xunit;

namespace Tests.Domain.UseCases{
    public class FitnessFunctionUnitTests{
        
         /**** Seats Map
                {0,1,1,1,0},
                {0,1,0,1,0},
                {0,0,0,1,0}
             */
        public Func<int[], int> PrepareScenario(){
            var seatsMap = new SeatsMap(
                3,5,
                new int[]{0,1,1,1,0,0,1,0,1,0,0,0,0,1,0});

            
            var topics = new List<Topic>(){
                new Topic{Id = "1", Weigth = 5},
                new Topic{Id = "2", Weigth = 2}
            };

            var attendees = new List<Attendee>(){
                new Attendee(){IndividualId = 111, TopicIds = new List<string>(){"1"}},
                new Attendee(){IndividualId = 222, TopicIds = new List<string>(){"2"}},
                new Attendee(){IndividualId = 333, TopicIds = new List<string>(){"1","2"}}
            };

            return FitnessFunction.GetScoreFunction(seatsMap,attendees,topics);
        }

        [Fact]
        public void Should_Avoid_alone_attendee(){
            var seatsMap = new SeatsMap(
                3,5,
                new int[]{0,1,1,1,0,0,1,0,1,0,0,0,0,1,0});

            
            var topics = new List<Topic>(){
                new Topic{Id = "1", Weigth = 1},
                new Topic{Id = "2", Weigth = 1},
            };

            var attendees = new List<Attendee>(){
                new Attendee(){IndividualId = 111, TopicIds = new List<string>(){"1"}},
                new Attendee(){IndividualId = 222, TopicIds = new List<string>(){"1"}},
                new Attendee(){IndividualId = 333, TopicIds = new List<string>(){"2"}}
            };

            var getScore =  FitnessFunction.GetScoreFunction(seatsMap,attendees,topics);

            /******Solution
                {0, 111, 222, X,  0},
                {0,  X,   0,  X,  0},
                {0,  0,   0, 333, 0}
            */

            var aloneSolution = new int[]{111,222,-1,-1,-1,333};

            /******Solution
                {0, 111, 222, X, 0},
                {0, 333,   0, X, 0},
                {0,  0,   0,  X, 0}
            */

            var groupSolution = new int[]{111,222,333,-1,-1,-1};

            Assert.True(getScore(groupSolution)>getScore(aloneSolution));
        }


        [Fact]
        public void ShouldGetRightScore(){
            /******Solution
                {0, 333, 222, X, 0},
                {0, 111,  0,  X, 0},
                {0,  0,   0,  X, 0}
            */
            var getScore = PrepareScenario();
            Assert.Equal(14,getScore(new int[]{333,222,-1,111,-1,-1}));
        }

        [Fact]
        public void ScoreZeroWithSeparatedAttendees(){
            /******Solution
                {0,  X,   X, 222, 0},
                {0, 111,  0,  X,  0},
                {0,  0,   0, 333, 0}
            */
            var getScore = PrepareScenario();
            Assert.Equal(0,getScore(new int[]{-1,-1,222,111,-1,333}));
        }

        [Fact]
        public void ScoreZeroWithNotCommonTopics(){
            /******Solution
                {0, 222, X,  333, 0},
                {0, 111, 0,   X,  0},
                {0,  0,  0,   X,  0}
            */
            var getScore = PrepareScenario();
            Assert.Equal(0,getScore(new int[]{222,-1,333,111,-1,-1}));
        }
    }
}