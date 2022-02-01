import React from 'react';
import UserContext from './src/context/UserContext';
import TestContext from './src/context/TestContext';

export const wrapRootElement = ({ element }) => (
  <UserContext>
    <TestContext>
      {element}
    </TestContext>
  </UserContext>
)

