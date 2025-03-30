import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: ${({ theme }) => theme.transition};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  ::selection {
    background: ${({ theme }) => theme.primary}44;
    color: ${({ theme }) => theme.text};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 ${({ theme }) => theme.primary}44;
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px ${({ theme }) => theme.primary}00;
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 ${({ theme }) => theme.primary}00;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .loading {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(to right, 
      ${({ theme }) => theme.surface} 4%,
      ${({ theme }) => theme.hover} 25%,
      ${({ theme }) => theme.surface} 36%
    );
    background-size: 1000px 100%;
  }

  .monaco-editor {
    padding: 8px;
    border-radius: 8px;
    
    .margin, .monaco-editor-background {
      background-color: ${({ theme }) => theme.surface} !important;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.surface};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary}88;
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.primary};
    }
  }

  a, button, input, select, textarea {
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}44;
    }
  }


  button:active {
    transform: scale(0.98);
  }


  button, i {
    user-select: none;
  }

  img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
`;
