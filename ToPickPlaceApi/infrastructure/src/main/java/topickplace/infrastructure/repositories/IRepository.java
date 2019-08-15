package topickplace.infrastructure.repositories;

import java.util.concurrent.CompletableFuture;

import io.vavr.control.Either;

public interface IRepository<T>{
    CompletableFuture<Either<String,IdEntry<T>>> Save(T data);
    CompletableFuture<Either<String,IdEntry<T>>> GetById(String id);
}