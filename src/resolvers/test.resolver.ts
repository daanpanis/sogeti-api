import {Test} from "../entities/test";
import {Arg, Query, Resolver} from "type-graphql";

@Resolver(() => Test)
export class TestResolver {

    @Query(() => Test)
    get(@Arg("id")id: string): Test {
        return {
            id
        };
    }

}