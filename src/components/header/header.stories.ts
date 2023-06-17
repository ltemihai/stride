import {HeaderComponent} from "./header.component";
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  argTypes: {
    theme: {
      options: ['onDark', 'onLight'],
      control: { type: 'select' },
      defaultValue: ['onLight']
    },
  },
};

export default meta;

type Story = StoryObj<HeaderComponent>;

export const Primary: Story = {
  argTypes: {
    theme: {
      options: ['onDark', 'onLight'],
      control: { type: 'select' },
      defaultValue: ['onLight']
    },
  },
  args: {
    theme: 'onLight'
  }
};
