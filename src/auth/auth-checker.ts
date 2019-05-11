import {AuthChecker} from "type-graphql";
import {Context} from "./context";
import {Container, Service} from "typedi";
import {UserService} from "../services/user.service";
import {Role} from "./role";

@Service()
export class CustomAuthChecker {

    public readonly authChecker: AuthChecker<Context> = async ({context}, roles) => {
        if (roles.length === 0) {
            return context.user !== undefined;
        }

        if (!context.user) {
            return false;
        }

        const userService = Container.get(UserService);
        const userRole = await userService.getRoleById(context.user.uid);
        return roles.some(role => userRole === role as Role);
    };

    constructor() {
    }

}
