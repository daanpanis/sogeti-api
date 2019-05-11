import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class User {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;

    @Field()
    bankAccount!: string;

    @Field()
    role!: string;
}
