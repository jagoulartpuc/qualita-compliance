package compliance.qualita.repository;

import compliance.qualita.domain.ModuleComment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleCommentRepository extends MongoRepository<ModuleComment, String> {
}
