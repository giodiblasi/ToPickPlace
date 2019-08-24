package topickplace.infrastructure.firebase;

public interface IFirestoreRepoFactory {
    FirestoreRepoFactory FromDocument(Class<?> classType, String documentId);
    <T> IRepository<T> GetRepo(Class<T> classType);
}