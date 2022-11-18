import React from 'react';

export class ErrorBonudary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <h3>Somthing went wrong...</h3>;
    }
    return this.props.children;
  }
}
