import { CsInputTextItem } from "@/framework/cost-saving";
import { Page } from "@/stories/Page";
import { Meta, StoryObj } from "@storybook/react";
import { MxInputText } from ".";

const meta = {
  title: "Components/MxInputText",
  component: MxInputText,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: new CsInputTextItem(),
  },
};
