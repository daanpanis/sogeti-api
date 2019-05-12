import {Field, ID, InputType, ObjectType} from "type-graphql";

@InputType("HotelInfoArgs")
@ObjectType()
export class HotelInfo {
    @Field(() => ID)
    id!: number;

    @Field()
    name!: string;

}
