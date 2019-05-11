import {Authorized, Query, Resolver} from "type-graphql";
import {AllCategories, Category} from "../entities/category";

@Resolver(() => Category)
export class CategoryResolver {

    @Authorized()
    @Query(() => [Category])
    categories(): Category[] {
        return AllCategories;
    }

}