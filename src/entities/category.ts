import {Field, ID, ObjectType} from "type-graphql";

export const AllCategories: Category[] = [
    {id: 0, name: "Bedrijfsfiets (FLEX)"},
    {id: 1, name: "Bedrijfsfitness (FLEX)"},
    {id: 2, name: "Diner Jubileum lustrum"},
    {id: 3, name: "Dinerbon sogeti"},
    {id: 4, name: "Dinerkosten hotel"},
    {id: 5, name: "Dinerkosten met klant"},
    {id: 6, name: "Dinerkosten overwerk"},
    {id: 7, name: "ESTA"},
    {id: 8, name: "Geschenken aan externe"},
    {id: 9, name: "Geschenken aan personeel"},
    {id: 10, name: "Hotelkosten"},
    {id: 11, name: "Informele bijeenkomst - op overige locaties"},
    {id: 12, name: "Informele bijeenkomst - op Sogeti locatie"},
    {id: 13, name: "Inkoop Start-ups"},
    {id: 14, name: "Jubileum diner 12,50 , 25- of 40 jarig"},
    {id: 15, name: "Openbaar vervoer, woon-werk (FLEX)"},
    {id: 16, name: "Opleidings- en ontplooiingskosten (FLEX)"},
    {id: 17, name: "Opleidingskosten"},
    {id: 18, name: "Overige"},
    {id: 19, name: "Parkeerkosten"},
    {id: 20, name: "Persoonlijk budget"},
    {id: 21, name: "Persoonlijk budget - Uitbetalen"},
    {id: 22, name: "Reiskosten Kennismigrant"},
    {id: 23, name: "Reiskosten YP"},
    {id: 24, name: "Vakbondscontributie (FLEX)"},
    {id: 25, name: "Vakverenigingscontributie (FLEX)"},
    {id: 26, name: "Verhuiskosten (FLEX)"},
    {id: 27, name: "Vervoerskosten niet flex"},
    {id: 28, name: "VOG / uittreksel GBA bij indiensttreding"},
    {id: 29, name: "VOG / uittreksel GBA overig"},
    {id: 30, name: "Werklunch (intern Sogeti) - op overige locaties"},
    {id: 31, name: "Werklunch (intern Sogeti) - op Sogeti locatie"},
    {id: 32, name: "Werklunch (met externe) - op overige locaties"},
    {id: 33, name: "Werklunch (met externe) - op Sogeti locatie"},
    {id: 34, name: "Zakelijke kilometers (FLEX)"}
];

@ObjectType()
export class Category {

    @Field(() => ID)
    id!: number;

    @Field()
    name!: string;

}