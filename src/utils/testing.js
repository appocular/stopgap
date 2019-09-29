import React from 'react';
import { createOvermindMock } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '../overmind'
import { render } from '@testing-library/react';

export const renderWithOvermind = (component, stateSetup, effects) => {
  const overmind = createOvermindMock(config, effects);

  if (stateSetup) {
    stateSetup(overmind.actions)
  }
  const provider = ({ children }) => {
    return <Provider value={overmind}>{children}</Provider>
  }

  return {
    ...render(component, { wrapper: provider}),
    overmind
  }
}
