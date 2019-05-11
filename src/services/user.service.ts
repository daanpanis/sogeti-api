import {Firestore} from "@google-cloud/firestore";
import {Service} from "typedi";
import {Role} from "../auth/role";
import {User} from "../entities/user";

const fireAdmin = require('firebase-admin');

@Service()
export class UserService {
    db: Firestore = fireAdmin.firestore();

    public async getUserById(id: string): Promise<User> {
        const snapshot = await this.db.collection('users').doc(id).get();
        // @ts-ignore
        const {bankAccount, name, role} = snapshot.data();
        return <User>{id: snapshot.id, name: name, bankAccount: bankAccount, role: role};
    }

    public async getRoleById(id: string): Promise<Role | null> {
        const user = await this.getUserById(id);
        return user ? user.role as Role : null;
    }
}
