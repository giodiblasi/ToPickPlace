using System.Threading.Tasks;
using Domain.Models;
using Domain.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        private IFindSolution findSolution;
        public SeatsController(IFindSolution findSolution){
            this.findSolution = findSolution;
        }

        [HttpPut]
        public async Task<ActionResult<AssignSeatsResponse>> AssignSeats([FromBody] AssignSeatsRequest request) =>
                await findSolution.Execute(request);
    }
}
