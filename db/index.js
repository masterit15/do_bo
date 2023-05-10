import Datastore from 'nedb'

const db = {};//new Datastore({ filename: 'db/departament', autoload: true })

db.departament = new Datastore('db/departament.db');

db.departament.loadDatabase();

export default db