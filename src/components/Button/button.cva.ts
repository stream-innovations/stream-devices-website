import { cva } from "class-variance-authority";

const button = cva(
  "inline-flex justify-center rounded-md text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600",
          "focus:bg-primary-600",
          "hover:bg-primary-600",
          "disabled:bg-primary-200",
          "disabled:pointer-events-none",
          "disabled:select-none",
          "focus-visible:outline-primary-600",
          "text-white",
          "py-3 px-8 w-full",
        ],
        secondary: [
          "bg-secondary",
          "hover:bg-gray-50",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-primary-500",
          "focus:ring-offset-2",
          "active:bg-gray-100",
          "disabled:bg-secondary-200",
          "text-primary-600",
          "border border-gray-300",
          "px-4 py-2 w-full",
        ],
        dropDown: [
          "bg-secondary",
          "hover:bg-gray-50",
          "disabled:bg-secondary-200",
          "text-primary-600",
          "px-4 py-2 w-full",
        ],
        danger: [
          "bg-danger-600",
          "focus:bg-danger-600",
          "hover:bg-danger-600",
          "focus-visible:outline-danger-600",
          "text-white",
          "py-3 px-8 w-full",
        ],
        icon: ["p-2 !shadow-none"],
        "icon-active": [
          "bg-primary-600",
          "text-white",
          "fill-white",
          "p-2 w-max items-center justify-center flex",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export default button;
