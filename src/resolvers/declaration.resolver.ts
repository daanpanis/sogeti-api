import {Arg, Authorized, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Role} from "../auth/role";
import {Container} from "typedi";
import {Declaration} from "../entities/declaration";
import {DeclarationService} from "../services/declaration.service";
import {CategoryService} from "../services/category.service";
import {UserService} from "../services/user.service";
import {StatusUpdateService} from "../services/status-update.service";
import {Context} from "../auth/context";

@Resolver(() => Declaration)
export class DeclarationResolver {
    @Authorized(Role.EMPLOYEE)
    @Query(() => [Declaration])
    async declarationsForEmployee(@Ctx(){user}: Context): Promise<Declaration[]> {
        return Container.get(DeclarationService).getDeclarationsForEmployee(user.uid);
    }

    @Authorized()
    @Query(() => Declaration)
    async declaration(@Arg("id") id: string): Promise<Declaration> {
        return Container.get(DeclarationService).getDeclarationById(id);
    }

    @FieldResolver()
    async category(@Root() declaration: Declaration) {
        return Container.get(CategoryService).getCategoryById(declaration.categoryId);
    }

    @FieldResolver()
    async user(@Root() declaration: Declaration) {
        return Container.get(UserService).getUserById(declaration.userId);
    }

    @FieldResolver()
    async statusUpdates(@Root() declaration: Declaration) {
        return Container.get(StatusUpdateService).getUpdatesForDeclarationId(declaration.id);
    }

    @FieldResolver()
    async status(@Root() declaration: Declaration) {
        return (await Container.get(StatusUpdateService).getLatestUpdateForDeclarationId(declaration.id)).status;
    }
}
