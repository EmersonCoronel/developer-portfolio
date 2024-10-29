import { renderHook, act } from '@testing-library/react'
import useAristotle from '../../../src/components/aristotle/useAristotle'
import { figures } from '../../../src/components/aristotle/figures'
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn().mockReturnValue('{"content": "test response"}')
}))


// Mock the fetch API
global.fetch = jest.fn()


describe('useAristotle Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock successful fetch response
    const mockResponse = {
      body: {
        getReader: () => ({
          read: jest.fn().mockResolvedValueOnce({
            value: new TextEncoder().encode('{"content": "test response"}'),
            done: false
          }).mockResolvedValueOnce({
            done: true
          })
        })
      }
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)
  })

  it('initializes with default values', () => {
    const { result } = renderHook(() => useAristotle())

    expect(result.current.message).toBe('')
    expect(result.current.messages).toEqual([])
    expect(result.current.selectedFigure).toEqual(figures.find(f => f.name === 'Aristotle'))
    expect(result.current.isDropdownOpen).toBe(false)
  })

  it('updates message state', () => {
    const { result } = renderHook(() => useAristotle())

    act(() => {
      result.current.setMessage('Hello')
    })

    expect(result.current.message).toBe('Hello')
  })

  it('handles figure selection', () => {
    const { result } = renderHook(() => useAristotle())
    const newFigure = figures[1] // Assuming there's more than one figure

    act(() => {
      result.current.setSelectedFigure(newFigure)
    })

    expect(result.current.selectedFigure).toEqual(newFigure)
    expect(result.current.messages).toEqual([]) // Messages should be cleared on figure change
  })

  it('starts scenario advice', () => {
    const { result } = renderHook(() => useAristotle())

    act(() => {
      result.current.startScenarioAdvice()
    })

    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].role).toBe('assistant')
    expect(result.current.isDropdownOpen).toBe(false)
  })

  it('handles message sending', async () => {
    const { result } = renderHook(() => useAristotle())

    act(() => {
      result.current.setMessage('Test message')
    })

    await act(async () => {
      await result.current.sendMessage()
    })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/chat'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
    )
  })

  it('handles keyboard events', () => {
    const { result } = renderHook(() => useAristotle())
    const mockEvent = {
      key: 'Enter',
      shiftKey: false,
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLTextAreaElement>

    act(() => {
      result.current.handleKeyDown(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it('generates categories with actions', () => {
    const { result } = renderHook(() => useAristotle())

    expect(result.current.categoriesWithActions).toBeDefined()
    expect(Array.isArray(result.current.categoriesWithActions)).toBe(true)
    expect(result.current.categoriesWithActions.length).toBeGreaterThan(0)
  })

  it('toggles dropdown state', () => {
    const { result } = renderHook(() => useAristotle())

    act(() => {
      result.current.setIsDropdownOpen(true)
    })

    expect(result.current.isDropdownOpen).toBe(true)

    act(() => {
      result.current.setIsDropdownOpen(false)
    })

    expect(result.current.isDropdownOpen).toBe(false)
  })

  it('handles empty message send attempt', async () => {
    const { result } = renderHook(() => useAristotle())

    act(() => {
      result.current.setMessage('   ') // Empty or whitespace message
    })

    await act(async () => {
      await result.current.sendMessage()
    })

    expect(global.fetch).not.toHaveBeenCalled()
  })
});