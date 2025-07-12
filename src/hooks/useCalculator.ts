import { useState } from 'react';

export interface CalculatorState {
  currentValue: string;
  previousValue: string | null;
  operation: string | null;
  waitingForOperand: boolean;
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
  });

  const clearAll = () => {
    setState({
      currentValue: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
    });
  };

  const deleteLastDigit = () => {
    if (state.waitingForOperand) return;
    
    const newValue = state.currentValue.length === 1 
      ? '0' 
      : state.currentValue.slice(0, -1);
    
    setState(prev => ({
      ...prev,
      currentValue: newValue,
    }));
  };

  const inputDigit = (digit: string) => {
    if (state.waitingForOperand) {
      setState(prev => ({
        ...prev,
        currentValue: digit,
        waitingForOperand: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentValue: prev.currentValue === '0' ? digit : prev.currentValue + digit,
      }));
    }
  };

  const inputDecimal = () => {
    if (state.waitingForOperand) {
      setState(prev => ({
        ...prev,
        currentValue: '0.',
        waitingForOperand: false,
      }));
    } else if (state.currentValue.indexOf('.') === -1) {
      setState(prev => ({
        ...prev,
        currentValue: prev.currentValue + '.',
      }));
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(state.currentValue);

    if (state.previousValue === null) {
      setState(prev => ({
        ...prev,
        previousValue: state.currentValue,
        operation: nextOperation,
        waitingForOperand: true,
      }));
    } else if (state.operation) {
      const currentValue = parseFloat(state.previousValue);
      const newValue = calculate(currentValue, inputValue, state.operation);

      setState(prev => ({
        ...prev,
        currentValue: String(newValue),
        previousValue: String(newValue),
        operation: nextOperation,
        waitingForOperand: true,
      }));
    }
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case 'X':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (!state.previousValue || !state.operation) return;

    const inputValue = parseFloat(state.currentValue);
    const previousValue = parseFloat(state.previousValue);
    const newValue = calculate(previousValue, inputValue, state.operation);

    setState(prev => ({
      ...prev,
      currentValue: String(newValue),
      previousValue: null,
      operation: null,
      waitingForOperand: false,
    }));
  };

  const handleButtonClick = (buttonText: string) => {
    switch (buttonText) {
      case 'AC':
        clearAll();
        break;
      case 'DEL':
        deleteLastDigit();
        break;
      case '+':
      case '-':
      case 'X':
      case '/':
        performOperation(buttonText);
        break;
      case '=':
        performCalculation();
        break;
      case '.':
        inputDecimal();
        break;
      default:
        if (/[0-9]/.test(buttonText)) {
          inputDigit(buttonText);
        }
        break;
    }
  };

  return {
    currentValue: state.currentValue,
    handleButtonClick,
    previousValue: state.previousValue,
    operation: state.operation,
  };
};
