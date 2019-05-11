import {Arg, Authorized, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Role} from "../auth/role";
import {Container} from "typedi";
import {Declaration} from "../entities/declaration";
import {DeclarationService} from "../services/declaration.service";
import {CategoryService} from "../services/category.service";
import {UserService} from "../services/user.service";

@Resolver(() => Declaration)
export class DeclarationResolver {
    @Authorized(Role.EMPLOYEE)
    @Query(() => [Declaration])
    async declarationsForEmployee(@Arg("employeeId") employeeId: String): Promise<Declaration[]> {
        return Container.get(DeclarationService).getDeclarationsForEmployee(employeeId);
    }

    @FieldResolver()
    async category(@Root() declaration: Declaration) {
        return Container.get(CategoryService).getCategoryById(declaration.categoryId);
    }

    @FieldResolver()
    async user(@Root() declaration: Declaration) {
        return Container.get(UserService).getUserById(declaration.userId);
    }
}
