import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Primary action', variant: 'primary' }
}

export const Ghost: Story = {
  args: { children: 'Secondary', variant: 'ghost' }
}
