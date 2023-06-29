import {rusToEng} from "./dictionary.Z.js";

export function transliterate(str) {


    return str
        .toLowerCase()
        .split("")
        .map(function (char) {
            return rusToEng[char] || char;
        })
        .join("");
}