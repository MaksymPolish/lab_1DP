import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App Component', () => {
  it('should render the counter component', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: /Click Counter/i })
    expect(heading).toBeInTheDocument()
  })

  it('should display initial count as 0', () => {
    render(<App />)
    const countDisplay = screen.getByText('0')
    expect(countDisplay).toBeInTheDocument()
  })

  it('should increment count when click button is pressed', async () => {
    render(<App />)
    const clickButton = screen.getByRole('button', { name: /Click Me/i })
    
    await userEvent.click(clickButton)
    expect(screen.getByText('1')).toBeInTheDocument()
    
    await userEvent.click(clickButton)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should reset count when reset button is pressed', async () => {
    render(<App />)
    const clickButton = screen.getByRole('button', { name: /Click Me/i })
    const resetButton = screen.getByRole('button', { name: /Reset/i })
    
    // Increment count multiple times
    await userEvent.click(clickButton)
    await userEvent.click(clickButton)
    await userEvent.click(clickButton)
    expect(screen.getByText('3')).toBeInTheDocument()
    
    // Reset counter
    await userEvent.click(resetButton)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should display tech stack information', () => {
    render(<App />)
    expect(screen.getByText(/React \+ TypeScript/)).toBeInTheDocument()
    expect(screen.getByText(/Vite Build Tool/)).toBeInTheDocument()
    expect(screen.getByText(/ESLint Code Quality/)).toBeInTheDocument()
    expect(screen.getByText(/GitHub Pages Deployment/)).toBeInTheDocument()
  })
})
