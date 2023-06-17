import type {Meta, StoryObj} from '@storybook/angular';
import {NavButtonComponent} from "./nav-button.component";

const meta: Meta<NavButtonComponent> = {
  component: NavButtonComponent,
  argTypes: {
    route: {
      options: [['/isActive'], ['/notActive']],
      control: { type: 'select' },
      defaultValue: ['/home'],
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'Label'
    },
    icon: {
      options: ['tuiIconHeartLarge','tuiIconHeartLarge','tuiIconListLarge','tuiIconSettingsLarge'],
      control: {type: 'select'},
      defaultValue: 'tuiIconHeartLarge'
    }
  },
};

export default meta;

type Story = StoryObj<NavButtonComponent>;

export const NavButton: Story = {
  parameters: {
    angularRouter: {active: '/isActive'},
    label: 'Dummy Label',
    icon: 'tuiIconHeartLarge',
    route: ['/matches']
  }
};
