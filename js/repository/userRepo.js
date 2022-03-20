const db = new Localbase("user.db");
const userCollection = "users";
const url = "YalaPay-data/users.json";

export class UserRepo {
    getUserByEmail(email) {
        return db.collection(userCollection).doc({ email: email }).get();
    }

    async addUsers() {
        const response = await fetch(url);
        const data = await response.json();
        for (const user of data) {
            const userExists = await db.collection(userCollection).doc({ email: user.email }).get();
            if(userExists==undefined) 
                await db.collection(userCollection).add(user);
        }
    }

    getUsers() {
        return db.collection(userCollection).get();
    }

}
