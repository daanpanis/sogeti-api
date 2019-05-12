import {ArgsType, Field, InputType, ObjectType} from "type-graphql";
import {ParkingInfoRow} from "./parking-info.row";

@InputType("ParkingInfoArgs")
@ObjectType()
export class ParkingInfo {

    @Field()
    month!: number;
    @Field()
    year!: number;
    @Field(() => [ParkingInfoRow])
    rows!: ParkingInfoRow[];


}