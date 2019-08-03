namespace GeneticAlgorithm.GAComponents{
     public class Individual<T>{
        public T[] Value{get; private set;}
        public int Score{get; private set;}
        public Individual(T[] value, int score){
            this.Value = value;
            this.Score = score;
        }
    }

}
