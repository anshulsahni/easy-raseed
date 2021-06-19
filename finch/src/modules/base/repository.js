import { omitRecursive } from '../../helpers/object.js';
import { DbRepo } from '../../services/database.js';

export default class BaseRepository extends DbRepo {
  toPublicObject() {
    return omitRecursive(this.toObject(), ['_id', '__v']);
  }
}
