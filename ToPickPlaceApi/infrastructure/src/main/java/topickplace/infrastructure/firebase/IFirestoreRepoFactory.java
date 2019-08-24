package topickplace.infrastructure.firebase;

public interface IFirestoreRepoFactory {
    FirestoreRepoFactory FromDocument(String collection, String documentId);
    <T> IRepository<T> GetRepo(Class<T> classType, String collection);
}