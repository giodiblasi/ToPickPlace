namespace Domain.Models{
    public class SeatsMap{
        public int Rows{get; private set;}
        public int Cols {get;private set;}
        public  int[,] Map {get; private set;}

        public SeatsMap(int rows, int cols, int[] map){
            Map = new int[rows,cols];
            Rows = rows;
            Cols = cols;
            for(int i=0;i<map.Length;i++){
                int rindex = i/cols;
                int cindex = i%cols;
                Map[rindex, cindex] = map[i];
            }
        }
    }
}