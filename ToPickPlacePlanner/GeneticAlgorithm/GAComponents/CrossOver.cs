using System;
using System.Collections.Generic;
using System.Linq;
using GeneticAlgorithm.Utils;

namespace GeneticAlgorithm.GAComponents{

    public interface ICrossOver<T>
    {
        List<T[]> Cross(List<T[]> parents);
    }
    public class OnePointCrossOver<T> : ICrossOver<T>
    {
        private IIndividualGenesPoint crossOverPointSelector;

        public OnePointCrossOver(IIndividualGenesPoint crossOverPoint){
            this.crossOverPointSelector = crossOverPoint;
        }

        public List<T[]> Cross(List<T[]> parents)
        {
            
            var offpsring = new List<T[]>();
            var geneCount = parents.First().Count();
            var parentsCount = parents.Count(); 
            for(int i=0; i<parentsCount; i+=2){
                var pairParents = (parents.ElementAt(i), parents.ElementAt(i+1));
                var crossOverIndex = crossOverPointSelector.GetPoint(geneCount-1);
                
                var individual = new List<T>(pairParents.Item1.Take(crossOverIndex));
                
                for(int j=0;j< pairParents.Item2.Length; j++){
                    var gene =  pairParents.Item2[j];
                    if(!individual.Contains(gene)) individual.Add(gene);
                }
                
                offpsring.Add(individual.ToArray());
            }
            return offpsring;
        }
    }
}