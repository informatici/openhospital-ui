import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Chart, registerables } from "chart.js";

import { Piechart } from "./Piechart";
import moment from "moment";

Chart.register(...registerables);

export default {
  title: "Charts/Piechart",
  component: Piechart,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Piechart>;

const Template: ComponentStory<typeof Piechart> = (args) => (
  <Piechart {...args} />
);

const labels = moment.weekdays();

export const Pie1 = Template.bind({});
Pie1.args = {
  title: "Pie Title",
  data: {
    labels,
    datasets: [
      {
        label: "Data 1",
        data: labels.map((e, i) => Math.random()),
        backgroundColor: labels.map((e) => "#feaedb"),
      },
    ],
  },
};
