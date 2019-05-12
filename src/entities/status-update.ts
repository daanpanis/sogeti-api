import {Field, ID, ObjectType} from "type-graphql";
import {User} from "./user";

@ObjectType()
export class StatusUpdate {
    @Field(() => ID)
    id!: string;

    @Field({nullable: true})
    comment?: string;

    @Field()
    date!: number;

    @Field()
    status!: number;

    @Field(() => User)
    user!: User;

    @Field()
    userId!: string;
}
