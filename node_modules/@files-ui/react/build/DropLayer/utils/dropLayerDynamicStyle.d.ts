export declare const makeDropLayerDynamicStyle: (dropzoneId: string, color: string | undefined) => {
    id: string;
    sheetRules: ({
        className: string;
        rules: {
            backgroundColor: string;
            borderRadius: string;
            position: string;
            left: number;
            top: number;
            width: string;
            height: string;
            zIndex: number;
            border: string;
            borderWidth?: undefined;
        };
    } | {
        className: string;
        rules: {
            width: string;
            height: string;
            borderWidth: string;
            backgroundColor?: undefined;
            borderRadius?: undefined;
            position?: undefined;
            left?: undefined;
            top?: undefined;
            zIndex?: undefined;
            border?: undefined;
        };
    })[];
};
