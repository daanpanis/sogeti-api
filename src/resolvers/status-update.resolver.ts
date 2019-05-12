import {Arg, Authorized, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Role} from "../auth/role";
import {Container} from "typedi";
import {Declaration} from "../entities/declaration";
import {DeclarationService} from "../services/declaration.service";
import {CategoryService} from "../services/category.service";
import {UserService} from "../services/user.service";
import {StatusUpdateService} from "../services/status-update.service";
import {StatusUpdate} from "../entities/status-update";

@Resolver(() => StatusUpdate)
export class StatusUpdateResolver {
    @FieldResolver()
    async user(@Root() statusUpdate: StatusUpdate) {
        return Container.get(UserService).getUserById(statusUpdate.userId);
    }
}
