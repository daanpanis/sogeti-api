import {Authorized, Query, Resolver} from "type-graphql";
import {AllCategories, Category} from "../entities/category";
import {Role} from "../auth/role";

@Resolver(() => Category)
export class CategoryResolver {

    @Authorized(Role.EMPLOYEE)
    @Query(() => [Category])
    categories(): Category[] {
        return AllCategories;
    }

}
