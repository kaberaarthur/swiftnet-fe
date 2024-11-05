import * as React from "react";
export declare function createFuiRippleFromDiv<T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(fuiContainerAbs: T | null, fuiContainerRel: T | null, color: string): void;
export declare function createRippleButton<T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(event: React.MouseEvent<T, MouseEvent>, variant: string, color: string): void;
