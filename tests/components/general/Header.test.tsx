import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../../../src/components/general/Header'

describe('Header Component', () => {
  it('renders navigation links', () => {
    render(<Header />)
    
    // Check for navigation links
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders with correct styling', () => {
    const { container } = render(<Header />)
    
    // Check if header has the correct styling classes
    const header = container.querySelector('header')
    expect(header).toHaveClass('p-6')
  })

  it('renders social media links', () => {
    render(<Header />)
    
    // Check for social media links
    expect(screen.getByLabelText('LinkedIn Profile')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram Profile')).toBeInTheDocument()
  })
})
