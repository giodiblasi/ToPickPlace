using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Domain.UseCases;
using Microsoft.AspNetCore.Mvc;
using ApiAssignSeatsRequest = Api.Models.AssignSeatsRequest;
using ApiAssignSeatsResponse = Api.Models.AssignSeatsResponse;

namespace api.Controllers
{
    [Route("/api/seats")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        private IFindSolution findSolution;
        public SeatsController(IFindSolution findSolution)
        {
            this.findSolution = findSolution;
        }

        [HttpPut]
        public async Task<ActionResult<ApiAssignSeatsResponse>> AssignSeats([FromBody] ApiAssignSeatsRequest request)
        {
            var idStore = new Dictionary<int, Api.Models.Attendee>();
            var domainRequest = new AssignSeatsRequest
            {
                Map = request.Map,
                Topics = request.Topics,
                Attendees = new List<Attendee>()
            };

            for (int i = 0; i < request.Attendees.Count(); i++)
            {
                var attendee = request.Attendees.ElementAt(i);
                var computedId = 100 + i;
                idStore.Add(computedId, attendee);
                domainRequest.Attendees = domainRequest.Attendees.Append(new Attendee()
                {
                    IndividualId = computedId,
                    TopicIds = attendee.TopicIds,
                });
            }

            var response = await findSolution.Execute(domainRequest);
            return new ApiAssignSeatsResponse()
            {
                Score = response.Score,
                Solution = response.Solution.Select(s =>
                {
                    var attendee = idStore.GetValueOrDefault(s);
                    return (attendee != null)
                    ? attendee.Id
                    : s.ToString();
                })
            };
        }
    }

}
