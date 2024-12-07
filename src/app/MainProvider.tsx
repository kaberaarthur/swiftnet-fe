"use client";
import Store from "@/Redux/Store";
import React, { ReactNode, ErrorInfo } from "react";
import { Provider } from "react-redux";
import { unstable_batchedUpdates } from "react-dom";
import Error404Container from "@/Components/Other/Error/Error404/Error404";

interface MainProviderProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

unstable_batchedUpdates(() => {
  console.error = () => {};
  console.warn = () => {};
});

class ErrorBoundary extends React.Component<MainProviderProps, ErrorBoundaryState> {
  constructor(props: MainProviderProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error.message.includes("ToastContainer")) return;
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <Error404Container />;
    return this.props.children;
  }
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  return (
    <Provider store={Store}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Provider>
  );
};

export default MainProvider;
