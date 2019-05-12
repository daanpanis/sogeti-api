import {Firestore, Timestamp} from "@google-cloud/firestore";
import {Service} from "typedi";
import {StatusUpdate} from "../entities/status-update";

const fireAdmin = require('firebase-admin');

@Service()
export class StatusUpdateService {
    db: Firestore = fireAdmin.firestore();

    public async getUpdatesForDeclarationId(declarationId: string): Promise<StatusUpdate[]> {
        const snapshot = await this.db.collection('declarations').doc(declarationId).collection('statusUpdates').get();
        return snapshot.docs.map(doc => {
            const data = doc.data() as StatusUpdate;
            data.date = (doc.data().date as Timestamp).toMillis();
            data.id = doc.id;
            return data;
        });
    }

    public async getLatestUpdateForDeclarationId(declarationId: string) {
        const snapshot = await this.db.collection('declarations').doc(declarationId).collection('statusUpdates').orderBy("date", 'desc').limit(1).get();
        return snapshot.docs.map(doc => {
            const data = doc.data() as StatusUpdate;
            data.date = (doc.data().date as Timestamp).toMillis();
            data.id = doc.id;
            return data;
        })[0];
    }
}
