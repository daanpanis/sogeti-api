import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class ParkingInfo {
    @Field(() => ID)
    id!: number;

    @Field()
    name!: string;
}
