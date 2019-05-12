import {Field, ID, ObjectType} from "type-graphql";

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
}
