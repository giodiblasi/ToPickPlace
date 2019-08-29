using System;

namespace GeneticAlgorithm.GAComponents{
   
    public interface IIndividualGenesPoint
    {
        int GetPoint(int maxValue);
    }

    public class RandonInvididualGenesPoint : IIndividualGenesPoint
    {
        private Random random;
        public RandonInvididualGenesPoint(int seed){
            random = new Random(seed);
        }
        public RandonInvididualGenesPoint(){
            random = new Random();
        }
        
        public int GetPoint(int maxValue) => random.Next(maxValue);
    }

    public class ConstantIndividualGenesPoint : IIndividualGenesPoint
    {
        private int crossOverPoint;
        public ConstantIndividualGenesPoint(int crossOverPoint){
            this.crossOverPoint = crossOverPoint;
        }

        public int GetPoint(int maxValue) =>
            (crossOverPoint <= maxValue)
                ? crossOverPoint
                : maxValue;
    }
}