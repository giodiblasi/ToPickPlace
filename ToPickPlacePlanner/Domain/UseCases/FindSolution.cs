using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Repositories;
using GeneticAlgorithm;
using GeneticAlgorithm.GAComponents;

namespace Domain.UseCases{
    public interface IFindSolution
    {
        Task<AssignSeatsResponse> Execute(AssignSeatsRequest request);
    }
    public class FindSolution : IFindSolution{

        private IConfigurationRepository configurationRepository;
        public FindSolution(IConfigurationRepository configurationRepository){
            this.configurationRepository = configurationRepository;
        }
        public async Task<AssignSeatsResponse> Execute(AssignSeatsRequest request){
            var configuration = await configurationRepository.GetConfiguration();
            var fitnessFunction = FitnessFunction.GetScoreFunction(request.Map, request.Attendees, request.Topics);
            var solution = await GeneticAlgorithmFactory<int>
                .Factory
                .WithMutationProbability(configuration.MutationProbability)
                .WithPopulationSize(configuration.PopulationSize)
                .WithEliteSize(configuration.PopulationSize)
                .WithMaxGenerations(configuration.MaxGenerations)
                .WithSolutionPrecision(configuration.SolutionPrecision)
                .Create(
                    new Mutator<int>(new RandonInvididualGenesPoint()),
                    new OnePointCrossOver<int>(new RandonInvididualGenesPoint()),
                    new RandomPopulationCreator<int>(),
                    fitnessFunction)
                .FindSolutionAsync(GetGenes(request.Map, request.Attendees).ToArray());
                
            return new AssignSeatsResponse{
                Solution = solution,
                Score = fitnessFunction(solution)
            };
        }
        private IEnumerable<int> GetGenes(SeatsMap map, IEnumerable<Attendee> attendees){
            var attendeesGenes = attendees.Select(attendee=>attendee.IndividualId).ToList();
            
            var availableSeats = 0;
            for(int i=0; i<map.Rows; i++)
                for(int j=0; j<map.Cols; j++)
                    if(map.Map[i,j]>0) availableSeats++;
            
            var unassignedSeatsGenes = Enumerable.Range(1, availableSeats-attendeesGenes.Count).Select(x=>x*-1);
            attendeesGenes.AddRange(unassignedSeatsGenes);
            return attendeesGenes;
        }
    }

    
}