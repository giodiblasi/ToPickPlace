package topickplace.infrastructure.firebase;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import io.vavr.control.Either;

public interface IRepository<T> {
    CompletableFuture<Either<String, T>> Save(T data);
    CompletableFuture<Either<String, T>> GetById(String id);
    CompletableFuture<Either<String, String>> RemoveById(String id);
    CompletableFuture<Either<String, List<T>>> GetAll(String... fields);
    CompletableFuture<Either<String, List<T>>> GetAll();
    CompletableFuture<Either<String, String>> Update(String id, T data);
    <FieldType> CompletableFuture<Either<String, String>> UpdateField(String id, String field, FieldType data);
    CompletableFuture<Either<String, List<T>>> GetAllContainingValueInArray(String arrayField, String valueToSearch);
}