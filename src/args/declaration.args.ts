import {Field, InputType} from "type-graphql";
import {GraphQLFloat} from "graphql";
import {ParkingInfo} from "../entities/parking-info";
import {HotelInfo} from "../entities/hotel-info";

@InputType()
export class DeclarationArgs {

    @Field()
    categoryId!: number;
    @Field()
    date!: Date;
    @Field(() => GraphQLFloat)
    amount!: number;
    @Field()
    inForeignCountry!: boolean;
    @Field()
    chargeCustomer!: boolean;
    @Field()
    currency!: string;
    @Field()
    description!: string;
    @Field()
    bankAccount!: string;
    @Field(() => ParkingInfo, {nullable: true})
    parkingInfo?: ParkingInfo;
    @Field(() => HotelInfo, {nullable: true})
    hotelInfo?: HotelInfo;
    userId!: string;

}