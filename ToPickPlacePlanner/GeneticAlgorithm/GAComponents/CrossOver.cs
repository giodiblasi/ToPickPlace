using System;
using System.Collections.Generic;
using System.Linq;


namespace GeneticAlgorithm.GAComponents{

    public interface ICrossOver<T>
    {
        IEnumerable<T[]> Cross(IEnumerable<T[]> parents);
    }
    public class OnePointCrossOver<T> : ICrossOver<T>
    {
        private IIndividualGenesPoint crossOverPointSelector;

        public OnePointCrossOver(IIndividualGenesPoint crossOverPoint){
            this.crossOverPointSelector = crossOverPoint;
        }

        public IEnumerable<T[]> Cross(IEnumerable<T[]> parents)
        {
            var offpsring = new List<T[]>();
            var geneCount = parents.First().Count();
            for(int i=0; i<parents.Count()-1; i+=2){
                var pairParents = (parents.ElementAt(i), parents.ElementAt(i+1));
                var crossOverIndex = crossOverPointSelector.GetPoint(geneCount-1);
                
                var individual = new List<T>(pairParents.Item1.Take(crossOverIndex));
                
                pairParents.Item2
                    .Where(gene=>!individual.Contains(gene))
                    .ToList()
                    .ForEach(gene=>individual.Add(gene));
                
                offpsring.Add(individual.ToArray());
            }
            return offpsring;
        }
    }
}