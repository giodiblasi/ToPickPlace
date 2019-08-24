package topickplace.infrastructure.firebase;

import topickplace.infrastructure.repositories.IRepository;

public interface IFirestoreRepoFactory {
    FirestoreRepoFactory FromDocument(String collection, String documentId);
    <T> IRepository<T> GetRepo(Class<T> classType, String collection);
}