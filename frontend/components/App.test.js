import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import AppClass from './AppClass';

describe('AppFunctional', () => {
  test('renders correct heading text', () => {
    render(<AppFunctional />);
    const coordinatesHeading = screen.getByText(/coordinates/i);
    const stepsHeading = screen.getByText(/you moved/i);
    expect(coordinatesHeading).toBeInTheDocument();
    expect(stepsHeading).toBeInTheDocument();
  });

  test('renders correct button text', () => {
    render(<AppFunctional />);
    const leftButton = screen.getByText(/left/i);
    const upButton = screen.getByText(/up/i);
    const rightButton = screen.getByText(/right/i);
    const downButton = screen.getByText(/down/i);
    const resetButton = screen.getByText(/reset/i);
    expect(leftButton).toBeInTheDocument();
    expect(upButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test('renders correct input placeholder', () => {
    render(<AppFunctional />);
    const emailInput = screen.getByPlaceholderText(/type email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('typing in input updates its value', () => {
    render(<AppFunctional />);
    const emailInput = screen.getByPlaceholderText(/type email/i);
    const typedEmail = 'test@example.com';
    expect(emailInput.value).toBe('');
    fireEvent.change(emailInput, { target: { value: typedEmail } });
    expect(emailInput.value).toBe(typedEmail);
  });

  test('Success message is correct', async () => {
    render(<AppFunctional />);
    const downButton = screen.getByText(/down/i);
    const emailInput = screen.getByPlaceholderText(/type email/i);
    const submitButton = screen.getByText(/submit/i);
  
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    fireEvent.change(emailInput, { target: { value: 'lady@gaga.com' } });
    fireEvent.click(submitButton);
  
    const successMessage = await screen.findByText(/Submitted successfully!/i);
    expect(successMessage).toBeInTheDocument();
  });
  
  
  
  
  
});



describe('AppClass', () => {
  test('renders correct heading text', () => {
    render(<AppClass />);
    const coordinatesHeading = screen.getByText(/coordinates/i);
    const stepsHeading = screen.getByText(/you moved/i);
    expect(coordinatesHeading).toBeInTheDocument();
    expect(stepsHeading).toBeInTheDocument();
  });

  test('renders correct button text', () => {
    render(<AppClass />);
    const leftButton = screen.getByText(/left/i);
    const upButton = screen.getByText(/up/i);
    const rightButton = screen.getByText(/right/i);
    const downButton = screen.getByText(/down/i);
    const resetButton = screen.getByText(/reset/i);
    expect(leftButton).toBeInTheDocument();
    expect(upButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test('renders correct input placeholder', () => {
    render(<AppClass />);
    const emailInput = screen.getByPlaceholderText(/type email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('typing in input updates its value', () => {
    render(<AppClass />);
    const emailInput = screen.getByPlaceholderText(/type email/i);
    const typedEmail = 'test@example.com';
    expect(emailInput.value).toBe('');
    fireEvent.change(emailInput, { target: { value: typedEmail } });
    expect(emailInput.value).toBe(typedEmail);
  });

  test('Success message is correct', async () => {
    render(<AppClass />);
    const downButton = screen.getByText(/down/i);
    const emailInput = screen.getByPlaceholderText(/type email/i);
    const submitButton = screen.getByText(/submit/i);

    fireEvent.click(downButton);
    fireEvent.click(downButton);
    fireEvent.change(emailInput, { target: { value: 'lady@gaga.com' } });
    fireEvent.click(submitButton);

    const successMessage = await screen.findByText(/Submitted successfully!/i);
    expect(successMessage).toBeInTheDocument();
  });
});
  
  

