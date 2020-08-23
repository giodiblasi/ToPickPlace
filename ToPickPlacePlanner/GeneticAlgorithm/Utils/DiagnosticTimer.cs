using System;
using System.Diagnostics;

namespace GeneticAlgorithm.Utils{
    public class DiagnosticTimer{
        public static long GetElapsedTime(Action actionUnderMeasure, Action<long> onElapsedTimer){
            var watch = Stopwatch.StartNew();
            actionUnderMeasure();
            watch.Stop(); 
            onElapsedTimer(watch.ElapsedMilliseconds);
            return watch.ElapsedMilliseconds;
        } 
    }
}