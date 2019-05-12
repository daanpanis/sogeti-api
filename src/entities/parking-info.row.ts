import {Field, InputType, ObjectType} from "type-graphql";
import {GraphQLFloat} from "graphql";

@InputType("ParkingInfoRowArgs")
@ObjectType()
export class ParkingInfoRow {

    @Field()
    date!: Date;
    @Field()
    description!: string;
    @Field(() => GraphQLFloat)
    amount!: number;

}