import {Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import {Role} from "../auth/role";
import {Container} from "typedi";
import {Declaration} from "../entities/declaration";
import {DeclarationService} from "../services/declaration.service";
import {CategoryService} from "../services/category.service";
import {UserService} from "../services/user.service";
import {StatusUpdateService} from "../services/status-update.service";
import {Context} from "../auth/context";
import {DeclarationArgs} from "../args/declaration.args";

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

    @Authorized(Role.UNIT_MANAGER, Role.INDIA_GUY)
    @Query(() => [Declaration])
    async allDeclarations() {
        return Container.get(DeclarationService).getAllDeclarations();
    }

    @Authorized(Role.EMPLOYEE)
    @Mutation(() => String, {nullable: true})
    async createDeclaration(@Arg("args") args: DeclarationArgs, @Ctx() {user}: Context): Promise<string> {
        console.log(args);
        const copy: DeclarationArgs = {
            userId: user.uid,
            bankAccount: args.bankAccount,
            amount: args.amount,
            description: args.description,
            categoryId: args.categoryId,
            chargeCustomer: args.chargeCustomer,
            inForeignCountry: args.inForeignCountry,
            date: args.date,
            currency: args.currency,
            parkingInfo: args.parkingInfo,
            hotelInfo: args.hotelInfo
        };
        if (!copy.hotelInfo) {
            (copy as any).hotelInfo = null;
        }
        const id = await Container.get(DeclarationService).addDeclaration(copy);
        await Container.get(StatusUpdateService).addUpdateForDeclarationId(id, 1, user.uid, null);
        return id;
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
