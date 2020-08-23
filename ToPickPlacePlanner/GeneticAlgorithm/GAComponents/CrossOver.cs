using System;
using System.Collections.Generic;
using System.Linq;
using GeneticAlgorithm.Utils;

namespace GeneticAlgorithm.GAComponents{

    public interface ICrossOver<T>
    {
        List<T[]> Cross(List<T[]> parents);
    }

    /**
    * Davis Order CrossOver (OX1) implementation
    * It produces n=parents/2 individuals
    **/
    public class DavisOrderCrossOver<T> : ICrossOver<T>
    {
        private IIndividualGenesPoint crossOverPointSelector;

        public DavisOrderCrossOver(IIndividualGenesPoint crossOverPoint){
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
                var crossOverSize = crossOverPointSelector.GetPoint(geneCount-crossOverIndex+1);
                var parentAGenes = pairParents.Item1.Skip(crossOverIndex).Take(crossOverSize);
                var individual = new T[geneCount];
                var parentBIndex = 0;
                for(int j=0;j<geneCount;j++){
                    if(j<crossOverIndex || j>crossOverIndex+crossOverSize-1){
                        while(parentAGenes.Contains(pairParents.Item2[parentBIndex])) parentBIndex++;
                        individual[j] = pairParents.Item2[parentBIndex++];
                    }
                    else{
                        individual[j] = pairParents.Item1[j];
                    }
                }
                
                offpsring.Add(individual);
            }
            return offpsring;
        }
    }

    /**
    * Single Point CrossOver (OX1) implementation
    * It produces n=(parents) individuals
    **/
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
            for(int i=0; i<parents.Count()-1; i+=2){
                var pairParents = (parents.ElementAt(i), parents.ElementAt(i+1));
                var crossOverIndex = crossOverPointSelector.GetPoint(geneCount-1);
                
                var individual = new List<T>(pairParents.Item1.Take(crossOverIndex));
                for(int j=0;j<pairParents.Item2.Count(); j++){
                    var gene = pairParents.Item2[j];
                    if(!individual.Contains(gene)) individual.Add(gene);
                }
                
                offpsring.Add(individual.ToArray());
            }
            return offpsring;
        }

    }
}