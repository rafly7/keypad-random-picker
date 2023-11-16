export type IconProps = {
    className?: string | undefined;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    width?: number;
    height?: number;
};

export type ArrowIconProps = IconProps & {
    direction: "up" | "down" | "left" | "right";
};

export const defaultIconProps: IconProps = {
    fill: "currentColor",
};

export const defaultOutlineIconProps: IconProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
};
