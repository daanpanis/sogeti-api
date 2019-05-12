import {Firestore, Timestamp} from "@google-cloud/firestore";
import {Service} from "typedi";
import {Declaration} from "../entities/declaration";
import {DeclarationArgs} from "../args/declaration.args";

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
            if (data.parkingInfo) {
                data.parkingInfo.rows.forEach(value => {
                    // @ts-ignore
                    value.date = (value.date as Timestamp).toDate();
                })
            }
            return data;
        });
    }

    public async getAllDeclarations(): Promise<Declaration[]> {
        return (await this.db.collection('declarations').get()).docs.map(doc => {
            const data = doc.data() as Declaration;
            data.date = (doc.data().date as Timestamp).toMillis();
            data.id = doc.id;
            if (data.parkingInfo) {
                data.parkingInfo.rows.forEach(value => {
                    // @ts-ignore
                    value.date = (value.date as Timestamp).toDate();
                })
            }
            return data;
        })
    }

    public async getDeclarationById(id: string): Promise<Declaration> {
        const snapshot = await this.db.collection('declarations').doc(id).get();
        const data = snapshot.data() as Declaration;
        // @ts-ignore
        const {date} = snapshot.data();
        data.date = (date as Timestamp).toMillis();
        data.id = snapshot.id;
        if (data.parkingInfo) {
            data.parkingInfo.rows.forEach(value => {
                // @ts-ignore
                value.date = (value.date as Timestamp).toDate();
            })
        }
        return data;
    }

    public async addDeclaration(declaration: DeclarationArgs) {
        (declaration as any).date = Timestamp.fromMillis(declaration.date.getTime());
        const reference = await this.db.collection('declarations').add(declaration);
        // declaration.id = reference.id;

        return reference.id;
    }
}
