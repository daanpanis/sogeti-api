import {Firestore} from "@google-cloud/firestore";
import {Service} from "typedi";
import {Role} from "../auth/role";

const fireAdmin = require('firebase-admin');

@Service()
export class UserService {
    db: Firestore = fireAdmin.firestore();

    public async getUserById(id: string) {
        const snapshot = await this.db.collection('users').doc(id).get();
        return snapshot.data();
    }

    public async getRoleById(id: string): Promise<Role | null> {
        const userData = await this.getUserById(id);
        return userData ? userData.role as Role : null;
    }
}
