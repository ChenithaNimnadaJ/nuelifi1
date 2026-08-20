import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import LineChart from '../lib/charts/LineChart'

const meta: Meta<typeof LineChart> = {
  title: 'Components/Charts/LineChart',
  component: LineChart,
}

export default meta

type Story = StoryObj<typeof LineChart>

export const Default: Story = {
  args: { labels: ['Mon','Tue','Wed','Thu','Fri'], data: [10,20,15,30,25] }
}
