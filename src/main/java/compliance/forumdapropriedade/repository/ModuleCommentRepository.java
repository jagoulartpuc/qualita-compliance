package compliance.forumdapropriedade.repository;

import compliance.forumdapropriedade.domain.ModuleComment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleCommentRepository extends MongoRepository<ModuleComment, String> {
}
