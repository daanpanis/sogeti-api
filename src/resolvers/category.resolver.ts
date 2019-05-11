import {Authorized, Query, Resolver} from "type-graphql";
import {Category} from "../entities/category";
import {Container} from "typedi";
import {CategoryService} from "../services/category.service";

@Resolver(() => Category)
export class CategoryResolver {

    @Authorized()
    @Query(() => [Category])
    async categories(): Promise<Category[]> {
        return Container.get(CategoryService).getCategories()
    }

}
