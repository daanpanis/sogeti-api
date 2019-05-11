import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Test {

    @Field(() => ID)
    id!: string;

}