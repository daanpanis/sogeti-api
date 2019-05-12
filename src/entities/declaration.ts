import {Field, ID, ObjectType} from "type-graphql";
import {ParkingInfo} from "./parking-info";
import {HotelInfo} from "./hotel-info";
import {Category} from "./category";
import {User} from "./user";
import {StatusUpdate} from "./status-update";

@ObjectType()
export class Declaration {
    @Field(() => ID)
    id!: string;

    @Field(() => User)
    user!: User;

    @Field(() => Category)
    category!: Category;

    @Field()
    date!: number;

    @Field()
    amount!: number;

    @Field()
    inForeignCountry!: boolean;

    @Field()
    chargeCustomer!: boolean;

    @Field()
    currency!: string;

    @Field()
    description!: string;

    @Field(() => ParkingInfo, {nullable: true})
    parkingInfo?: ParkingInfo;

    @Field(() => HotelInfo, {nullable: true})
    hotelInfo?: HotelInfo;

    @Field()
    categoryId!: number;

    @Field()
    userId!: string;

    @Field()
    status!: number;

    @Field(() => [StatusUpdate])
    statusUpdates!: StatusUpdate[];
}
