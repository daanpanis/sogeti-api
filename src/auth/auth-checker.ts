import {AuthChecker} from "type-graphql";
import {Context} from "./context";
import {Service} from "typedi";

@Service()
export class CustomAuthChecker {

    public readonly authChecker: AuthChecker<Context> = async ({context}, roles) => {
        if (roles.length === 0) {
            return context.user !== undefined;
        }

        if (!context.user) {
            return false;
        }

        /*  const query = this.userRoles.createQueryBuilder()
              .where('userId = :userId', {userId: context.user.uid})
              .andHaving('pharmacyId = :pharmacyId', {pharmacyId: context.pharmacyId});
          const role = await query.getOne();
          return !!(role && roles.find(value => value.toLocaleLowerCase() === role.role.toLocaleLowerCase()));*/
        return true;
    };

    constructor() {
    }

}