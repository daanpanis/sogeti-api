import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class HotelInfo {
    @Field(() => ID)
    id!: number;

    @Field()
    name!: string;

}
