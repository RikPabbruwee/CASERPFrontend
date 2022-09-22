import { Cursus } from "./cursus";
import { CursusInstantie } from "./cursusInstantie";

export interface FeedbackImports{
    duplicateCursusInstanties: CursusInstantie[],
    newCursusInstanties: CursusInstantie[],
    newCursus: Cursus[];
}