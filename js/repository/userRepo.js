const db = new Localbase('users.db');
export class UserRepo{
    getUser(email){
        return db.collection('users').doc({email:email}).get();
    }
}