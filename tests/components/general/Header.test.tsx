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

  it('renders social media links', () => {
    render(<Header />)
    
    // Check for social media links
    expect(screen.getByLabelText('LinkedIn Profile')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram Profile')).toBeInTheDocument()
  })
})
