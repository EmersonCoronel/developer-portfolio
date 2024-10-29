import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ChatBox from '../../../src/components/aristotle/ChatBox'

// Mock the CSS module
jest.mock('../../../src/components/aristotle/aristotle.module.css', () => ({
  chatBox: 'chatBox',
  messagesContainer: 'messagesContainer',
  message: 'message',
  messageUser: 'messageUser',
  messageAssistant: 'messageAssistant',
  inputContainer: 'inputContainer',
  inputTextarea: 'inputTextarea',
  inputButton: 'inputButton'
}))

describe('ChatBox Component', () => {
  const mockProps = {
    messages: [
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi there!' }
    ],
    message: '',
    setMessage: jest.fn(),
    sendMessage: jest.fn(),
    handleKeyDown: jest.fn(),
    messagesEndRef: { current: null },
    isDropdownOpen: false
  }

  it('renders messages correctly', () => {
    render(<ChatBox {...mockProps} />)
    
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi there!')).toBeInTheDocument()
  })

  it('handles message input correctly', () => {
    render(<ChatBox {...mockProps} />)
    
    const textarea = screen.getByPlaceholderText('Type your message here...')
    fireEvent.change(textarea, { target: { value: 'New message' } })
    
    expect(mockProps.setMessage).toHaveBeenCalledWith('New message')
  })

  it('handles send button click', () => {
    render(<ChatBox {...mockProps} />)
    
    const sendButton = screen.getByText('Send')
    fireEvent.click(sendButton)
    
    expect(mockProps.sendMessage).toHaveBeenCalled()
  })

  it('handles keyboard events', () => {
    render(<ChatBox {...mockProps} />)
    
    const textarea = screen.getByPlaceholderText('Type your message here...')
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' })
    
    expect(mockProps.handleKeyDown).toHaveBeenCalled()
  })

  it('adjusts opacity when dropdown is open', () => {
    const propsWithOpenDropdown = { ...mockProps, isDropdownOpen: true }
    render(<ChatBox {...propsWithOpenDropdown} />)
    
    const messagesContainer = document.querySelector('.messagesContainer')
    expect(messagesContainer).toHaveStyle({ opacity: '0' })
  })

  it('maintains normal opacity when dropdown is closed', () => {
    render(<ChatBox {...mockProps} />)
    
    const messagesContainer = document.querySelector('.messagesContainer')
    expect(messagesContainer).toHaveStyle({ opacity: '1' })
  })

  it('renders textarea with correct attributes', () => {
    render(<ChatBox {...mockProps} />)
    
    const textarea = screen.getByPlaceholderText('Type your message here...')
    expect(textarea).toHaveAttribute('rows', '3')
    expect(textarea).toHaveClass('inputTextarea')
  })

  it('renders with empty message list', () => {
    const propsWithNoMessages = {
      ...mockProps,
      messages: []
    }
    render(<ChatBox {...propsWithNoMessages} />)
    
    const messagesContainer = document.querySelector('.messagesContainer')
    expect(messagesContainer?.children.length).toBe(1) // Only the messagesEndRef div
  })
})
