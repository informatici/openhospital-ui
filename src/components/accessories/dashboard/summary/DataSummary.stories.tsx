import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { DataSummary } from "./DataSummary";

export default {
  title: "Widgets/DataSummary",
  component: DataSummary,
} as ComponentMeta<typeof DataSummary>;

const Template: ComponentStory<typeof DataSummary> = (args: any) => (
  <DataSummary {...args} />
);

export const Summary1 = Template.bind({});
Summary1.args = {
  label: "AVG Length Of Stay",
  value: "3.5 days",
};
