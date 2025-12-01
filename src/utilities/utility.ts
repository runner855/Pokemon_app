import { HOME_LABEL, POKEMON_LABEL } from "../constants/dictionary";
import { AppUrls } from "../type/appTypes";

export const NavBarStructure = [
  { link: HOME_LABEL, to: AppUrls.HOME },
  { link: POKEMON_LABEL, to: AppUrls.POKEMON },
];
