import React from 'react'
import { render, screen } from '@testing-library/react'
import AristotleDisplay from '../../../src/components/aristotle/AristotleDisplay'
import useAristotle from '../../../src/components/aristotle/useAristotle'

// Mock the custom hook
jest.mock('../../../src/components/aristotle/useAristotle')

// Mock the CSS module
jest.mock('../../../src/components/aristotle/aristotle.module.css', () => ({
  imageDisplay: 'imageDisplay',
  chatContainer: 'chatContainer'
}))

describe('AristotleDisplay Component', () => {
  const mockUseAristotle = {
    message: '',
    setMessage: jest.fn(),
    messages: [],
    selectedFigure: {
      id: '1',
      name: 'Aristotle',
      image: '/aristotle.jpg',
      description: 'Greek philosopher'
    },
    setSelectedFigure: jest.fn(),
    isDropdownOpen: false,
    setIsDropdownOpen: jest.fn(),
    messagesEndRef: { current: null },
    categoriesWithActions: [],
    startScenarioAdvice: jest.fn(),
    sendMessage: jest.fn(),
    handleKeyDown: jest.fn(),
    figures: [
      {
        id: '1',
        name: 'Aristotle',
        image: '/aristotle.jpg',
        description: 'Greek philosopher'
      }
    ]
  }

  beforeEach(() => {
    ;(useAristotle as jest.Mock).mockReturnValue(mockUseAristotle)
  })

  it('renders without crashing', () => {
    render(<AristotleDisplay />)
    expect(document.querySelector('.imageDisplay')).toBeInTheDocument()
    expect(document.querySelector('.chatContainer')).toBeInTheDocument()
  })

  it('renders with correct background image', () => {
    render(<AristotleDisplay />)
    const imageDisplay = document.querySelector('.imageDisplay') as HTMLElement
    expect(imageDisplay.style.backgroundImage).toBe('url(/aristotle.jpg)')
  })
})
