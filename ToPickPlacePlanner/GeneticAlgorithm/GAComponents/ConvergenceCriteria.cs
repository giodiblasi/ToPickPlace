using System;

namespace GeneticAlgorithm.GAComponents{
    public class ConvergenceCriteria{
        private int value;
        private int maxRound = 200;
        private int lastValue=0;

        private int round = 0;
        private double solutionPrecision;

        public ConvergenceCriteria(int lastValue, double solutionPrecision){
            this.lastValue = lastValue;
            this.solutionPrecision = solutionPrecision;
        }
        public bool IsConvergent(int value){
            if(round%maxRound==0){
                if(Math.Abs(lastValue-value)<solutionPrecision) return true;
                lastValue = value;
            }
            return false;
        }
    }
}