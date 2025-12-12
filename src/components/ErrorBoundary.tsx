import React from "react";

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error?: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error("Error capturado:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: "red" }}>💥 Hubo un error: {this.state.error?.message || "Unknown"}</div>;
    }

    return this.props.children;
  }
}