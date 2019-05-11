import {Firestore} from "@google-cloud/firestore";
import {Service} from "typedi";
import {Category} from "../entities/category";

const fireAdmin = require('firebase-admin');

@Service()
export class CategoryService {
    db: Firestore = fireAdmin.firestore();

    public async getCategories() {
        const snapshot = await this.db.collection('categories').get();
        return snapshot.docs.map(doc => <Category>{name: doc.data().name, id: parseInt(doc.id)});
    }

    public async getCategoryById(categoryId: number) {
        const snapshot = await this.db.collection('categories').doc(categoryId.toString()).get();
        // @ts-ignore
        const {name} = snapshot.data();
        return <Category>{name: name, id: parseInt(snapshot.id)}
    }
}
