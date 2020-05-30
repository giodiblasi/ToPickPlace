using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Models;

namespace Domain.UseCases{
    public class  FitnessFunction{
        class Seat{
            public int R{get;set;}
            public int C{get;set;}
        }

        public static Func<int[],int> GetScoreFunction(
            SeatsMap map,
            IEnumerable<Attendee> attendees,
            IEnumerable<Topic> topics){
                var availableSeats = GetAvailableSeats(map);
                return (int[] solution)=>{
                    var seatsMap = SeatsWithAttendees(map, availableSeats, solution);
                    var score =  0;
                    availableSeats.Where(seat=>seatsMap[seat.R, seat.C]>=0).ToList().ForEach(seat=>{
                        var targetTopicIds = attendees.First(a=>a.IndividualId == seatsMap[seat.R, seat.C]).TopicIds;
                        var neighboors = GetValidAdjacent(seat.R, seat.C, seatsMap);
                        neighboors.ToList().ForEach(neighboor=>{
                            var neigboorTopicIds = attendees.First(a=>a.IndividualId == seatsMap[neighboor.R,neighboor.C]).TopicIds;
                            var commondIds = targetTopicIds.Intersect(neigboorTopicIds);
                            score += topics.Where(topic=>commondIds.Contains(topic.Id)).Sum(t=>t.Weigth);
                         });
                    });
                    return score;
                };

        }

         private static IEnumerable<Seat> GetValidAdjacent(int r, int c, int[,] map){
            var seats = new List<Seat>();
            Action<int,int> addSeat = (int x,int y)=>seats.Add(new Seat{R=x, C=y});
            OnAssignedSeat(r-1,c-1, map, addSeat);
            OnAssignedSeat(r-1,c, map, addSeat);
            OnAssignedSeat(r-1,c+1, map, addSeat);

            OnAssignedSeat(r,c-1, map, addSeat);
            OnAssignedSeat(r,c+1, map, addSeat);

            OnAssignedSeat(r+1,c-1, map, addSeat);
            OnAssignedSeat(r+1,c, map, addSeat);
            OnAssignedSeat(r+1,c+1, map, addSeat);
            return seats;
        }

        private static void OnAssignedSeat(int r, int c, int[,] map, Action<int,int> onAssignedSeat){
            var R=map.GetLength(0);
            var C=map.GetLength(1);
            if(r>=0 && r<R && c>=0 && c<C && map[r,c]>0) onAssignedSeat(r,c);
        }

        private static int[,] SeatsWithAttendees(SeatsMap map, Seat[] availableSeats, int[] attendeeIds){
            var seatsMap = (int [,])map.Map.Clone();
            for(int i=0; i<availableSeats.Length; i++){
                var seat = availableSeats[i];
                seatsMap[seat.R, seat.C] = attendeeIds[i];
            }
            return seatsMap;
        }

        private static Seat[] GetAvailableSeats(SeatsMap map){
            var seats = new List<Seat>();
            for(int i=0;i<map.Rows;i++)
                for(int j=0; j<map.Cols;j++){
                    if(map.Map[i,j]==1) seats.Add(new Seat{R=i, C=j});
                }
                return seats.ToArray();
        }
    }
    
    
}