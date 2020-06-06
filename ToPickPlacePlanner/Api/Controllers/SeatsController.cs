using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
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
            var mapper = new ApiMapper(request);
            var response = await findSolution.Execute(mapper.GetDomainRequest());
            return mapper.GetApiResponse(response, "/");
        }
    }

}
