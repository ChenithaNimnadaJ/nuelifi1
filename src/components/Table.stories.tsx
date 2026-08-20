import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Table from './Table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

const columns = [{ key: 'a', title: 'A' }, { key: 'b', title: 'B' }]
const data = [{ a: '1', b: '2' }, { a: '3', b: '4' }]

export const Default: Story = {
  args: { columns, data }
}
