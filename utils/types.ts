export type AccordionItem = {
  icon?: string;
  value: string;
  title: string;
  contents: {
    label: string;
    type: "router" | "button";
    route?: string;
  }[];
};
