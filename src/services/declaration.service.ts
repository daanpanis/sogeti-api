import {Firestore, Timestamp} from "@google-cloud/firestore";
import {Service} from "typedi";
import {Declaration} from "../entities/declaration";

const fireAdmin = require('firebase-admin');

@Service()
export class DeclarationService {
    db: Firestore = fireAdmin.firestore();

    public async getDeclarationsForEmployee(employeeId: String): Promise<Declaration[]> {
        const snapshot = await this.db.collection('declarations').where("userId", "==", employeeId).get();
        return snapshot.docs.map(doc => {
            const data = doc.data() as Declaration;
            data.date = (doc.data().date as Timestamp).toMillis();
            data.id = doc.id;
            return data;
        });
    }

    public async getDeclarationById(id: string): Promise<Declaration> {
        const snapshot = await this.db.collection('declarations').doc(id).get();
        const data = snapshot.data() as Declaration;
        // @ts-ignore
        const {date} = snapshot.data();
        data.date = (date as Timestamp).toMillis();
        data.id = snapshot.id;
        return data;
    }
}
