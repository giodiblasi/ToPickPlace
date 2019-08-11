package topickplace.core.repositories;

import java.util.concurrent.CompletableFuture;

import io.vavr.control.Either;

public interface IRepository<T>{
    CompletableFuture<Either<String,T>> Save(T data);
    CompletableFuture<Either<String,T>> GetById(String id);
}