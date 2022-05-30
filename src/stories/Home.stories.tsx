import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Home } from '../components/AppRouter/Routes/Home';


export default {
  title: 'Example/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = () => <Home/>;

export const Page = Template.bind({});
