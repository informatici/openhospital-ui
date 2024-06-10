import { UserDTO } from "../../generated";
import { userGroupsDTO } from "./userGroupDTO";
export const usersDTO: UserDTO[] = [
  {
    userName: "administrator",
    userGroupName: userGroupsDTO[0],
    desc: "hospital super admin",
    passwd: "a",
  },
  {
    userName: "tsognong",
    userGroupName: userGroupsDTO[0],
    passwd: "b",
  },
  {
    userName: "axelpezzo",
    userGroupName: userGroupsDTO[0],
    desc: "Alex Pezzini",
    passwd: "c",
  },
  {
    userName: "almeida1492",
    userGroupName: userGroupsDTO[0],
    desc: "Enrique de Almeida",
    passwd: "d",
  },
  {
    userName: "SteveGT96",
    userGroupName: userGroupsDTO[0],
    desc: "Steve Tsala",
    passwd: "e",
  },
  {
    userName: "alefalezza",
    userGroupName: userGroupsDTO[1],
    desc: "Alessandro Falezza",
    passwd: "f",
  },
  {
    userName: "mwithi",
    userGroupName: userGroupsDTO[1],
    desc: "Alessandro Domanico",
    passwd: "g",
  },
  {
    userName: "transifex-integration",
    userGroupName: userGroupsDTO[2],
    passwd: "h",
  },
  {
    userName: "dependabot",
    userGroupName: userGroupsDTO[2],
    passwd: "i",
  },
  {
    userName: "gasp",
    userGroupName: userGroupsDTO[1],
    desc: "Gaspard Beernaert",
    passwd: "j",
  },
  {
    userName: "xrmx",
    userGroupName: userGroupsDTO[1],
    desc: "Riccardo Magliocchetti",
    passwd: "k",
  },
  {
    userName: "AceGentile",
    userGroupName: userGroupsDTO[1],
    passwd: "l",
  },
  {
    userName: "nicolaburetta",
    userGroupName: userGroupsDTO[1],
    passwd: "z",
    desc: "Nicola Schiavon",
  },
  {
    userName: "pviotti",
    userGroupName: userGroupsDTO[1],
    passwd: "z",
    desc: "Paolo",
  },
  {
    userName: "elvisciuffetelli",
    userGroupName: userGroupsDTO[1],
    passwd: "z",
    desc: "Elvis Ciuffetelli",
  },
  {
    userName: "dbmalkovsky",
    userGroupName: userGroupsDTO[1],
    passwd: "z",
    desc: "David B Malkovsky",
  },
  {
    userName: "MrQwenty",
    userGroupName: userGroupsDTO[1],
    passwd: "z",
    desc: "Matteo (マッテオ)",
  },
  {
    userName: "simobasso",
    userGroupName: userGroupsDTO[1],
    passwd: "z",
    desc: "Simone Basso",
  },
  {
    userName: "mizzioisf",
    userGroupName: userGroupsDTO[1],
    passwd: "z",
  },
];
