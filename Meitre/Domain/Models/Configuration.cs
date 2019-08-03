namespace Domain.Models{
    public class Configuration{
        public int PopulationSize {get;set;}
        public decimal MutationProbability {get;set;}
        public int EliteSize {get;set;}
        public double SolutionPrecision {get;set;}

        public int MaxGenerations {get;set;}
    }

}
