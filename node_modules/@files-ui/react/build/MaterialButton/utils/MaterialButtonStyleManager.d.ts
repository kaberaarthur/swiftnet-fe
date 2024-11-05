import { DynamicSheet } from "@dynamicss/dynamicss";
export default class MaterialButtonStyleManager {
    static nextButtonClassNameNumber: number;
    /**
     * Increases the count and retrieves the next number
     * @returns the next static number in styles
     */
    static getNextId(): number;
    /**
     *
     * @param idClassName identifyer
     * @param variant the variant of the button
     * @param disabled disabled prop
     * @param color the theme color
     * @param textColor the text color
     * @returns a DynamicSheet
     */
    static makeDynamicStyle: (idClassName: number | string | undefined, variant?: string, disabled?: boolean, color?: string, textColor?: string, textDecoration?: "uppercase" | "capitalize" | "lowercase" | "none") => DynamicSheet;
}
