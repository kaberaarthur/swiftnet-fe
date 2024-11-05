import * as React from "react";
/**
 * Performs stopPropagation and preventDefault functions on an click event instance
 * @param evt click event handler object
 */
export declare function handleClickUtil<T extends HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | SVGSVGElement | HTMLInputElement>(evt: React.MouseEvent<T, MouseEvent>): void;
/**
 * Click programatically an input element.
 * If the input element is null, nothing will happend
 * @param input the input element target to make a click
 */
export declare const handleClickInput: (input: HTMLInputElement | null) => void;
