import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: { open: true, title: 'Preview modal', children: <div>Modal content</div>, onClose: ()=>{} }
}
