import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(error);

    let message = undefined;

    try {
      if (error instanceof Object) {
        message = error.message;
      }
      message = JSON.stringify(error);
    } catch (e) {
      console.error(e);
    }
    return { hasError: true, message };
  }

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <>
        <p>エラー</p>
        <code>
          {this.state.message ??
            "エラーが発生しました。ページをリロードしてください。"}
        </code>
      </>
    );
  }
}
