import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: { children: <div><h4 className="font-medium">Card title</h4><p className="text-sm text-muted mt-2">Card body</p></div> }
}
