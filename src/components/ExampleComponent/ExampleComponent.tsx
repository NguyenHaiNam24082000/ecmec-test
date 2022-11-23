import React from 'react';

export interface ExampleComponentProps {
  children: React.ReactNode;
}

function ExampleComponent({ children }: ExampleComponentProps) {
  return <div>{children}</div>;
}

export default ExampleComponent;
