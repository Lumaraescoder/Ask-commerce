
import { Meta, StoryFn } from '@storybook/react';

import {Button, ButtonProps } from './Button';

export default {
  title: "button", 
  component: Button,
  argTypes:{
    variant:{
      control: {
        type: "select"
      },
    },
    onClick: {
      action: "clicked"
    }
  }
} as Meta

const Template: StoryFn<ButtonProps> = (args) => <Button {...args}/>;

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  children: "Primary button"
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  children: "Secondary button"
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  variant: 'tertiary',
  children: "Tertiary button"
}