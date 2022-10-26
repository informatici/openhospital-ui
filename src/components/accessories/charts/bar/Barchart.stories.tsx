import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Chart, registerables } from "chart.js";
import { Barchart } from "./Barchart";
import moment from "moment";

Chart.register(...registerables);

export default {
  title: "Charts/Barchart",
  component: Barchart,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Barchart>;

const Template: ComponentStory<typeof Barchart> = (args) => (
  <Barchart {...args} />
);

const labels = moment.months();

export const Bar1 = Template.bind({});
Bar1.args = {
  title: "Bar Title",
  data: {
    labels,
    datasets: [
      {
        label: "Data 1",
        data: labels.map((e) => Math.random()),
        backgroundColor: "#fabcde",
      },
    ],
  },
};
