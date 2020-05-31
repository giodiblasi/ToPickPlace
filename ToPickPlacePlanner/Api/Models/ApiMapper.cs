using DomainRequest = Domain.Models.AssignSeatsRequest;
using DomainResponse = Domain.Models.AssignSeatsResponse;
using ApiRequest = Api.Models.AssignSeatsRequest;
using ApiResponse = Api.Models.AssignSeatsResponse;
using System.Collections.Generic;
using System.Linq;

namespace Api.Models
{
    public class ApiMapper
    {
        private readonly ApiRequest _apiRequest;
        private IEnumerable<(Domain.Models.Attendee domainAttendee, string apiAttendeeId)> _map;

        public ApiMapper(ApiRequest apiRequest)
        {
            _map = apiRequest.Attendees.Select(MapAttendee);
            _apiRequest = apiRequest;
            
        }

        public DomainRequest GetDomainRequest()
        {
            return new DomainRequest()
            {
                Map = _apiRequest.Map,
                Topics = _apiRequest.Topics,
                Attendees = _map.Select(r => r.domainAttendee)
            };
        }

        public ApiResponse GetApiResponse(DomainResponse response, string emptyValue)
        {
            var idStore = _map.ToDictionary(r => r.domainAttendee.IndividualId, r => r.apiAttendeeId);
            return new ApiResponse()
            {
                Score = response.Score,
                Solution = response.Solution.Select(s=>idStore.GetValueOrDefault(s, emptyValue)).ToList()
            };
        }

         private  (Domain.Models.Attendee domainAttendee, string apiAttendeeId) MapAttendee(Api.Models.Attendee apiAttendee, int index){
            var domainAttendee= new Domain.Models.Attendee()
            {
                IndividualId = 100 + index,
                TopicIds = apiAttendee.TopicIds,
            };
            return (domainAttendee, apiAttendee.Id);
        }
    }
}