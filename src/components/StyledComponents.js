import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  transition: ${({ theme }) => theme.transition};
`;

export const Header = styled.header`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideIn 0.5s ease;
  padding: 10px 20px;
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};

  h1 {
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
    background: linear-gradient(120deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}88);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${pulseAnimation} 2s infinite ease-in-out;
  }
`;

export const ShortcutHint = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text}aa;
  background: ${({ theme }) => theme.background};
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadow};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const EditorContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  height: 70vh;
  animation: fadeIn 0.5s ease;
`;

export const QuerySection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 16px;
  transition: ${({ theme }) => theme.transition};
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}44);
    border-radius: 12px 12px 0 0;
  }
`;

export const ResultsSection = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 16px;
  overflow: auto;
  transition: ${({ theme }) => theme.transition};
  position: relative;

  &:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}44, ${({ theme }) => theme.primary});
    border-radius: 12px 12px 0 0;
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.primary}88 ${theme.surface}`};

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.surface};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary}88;
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.primary};
    }
  }
`;

export const QueryControls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  animation: slideIn 0.5s ease;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: ${({ theme }) => theme.transition};
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
    transform: none;
    opacity: 0.7;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  min-width: 200px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }

  option {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    padding: 8px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 10px;
  animation: fadeIn 0.5s ease;
  
  th, td {
    border: 1px solid ${({ theme }) => theme.border};
    padding: 12px;
    text-align: left;
    transition: ${({ theme }) => theme.transition};
  }
  
  th {
    background-color: ${({ theme }) => theme.tableHeader};
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 1;
    backdrop-filter: blur(8px);
  }
  
  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.hover};
  }
  
  tbody tr {
    transition: ${({ theme }) => theme.transition};
    
    &:hover {
      background-color: ${({ theme }) => theme.hover};
      transform: scale(1.01);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  }

  td {
    border-top: none;
  }

  th:first-child,
  td:first-child {
    border-left: none;
  }

  th:last-child,
  td:last-child {
    border-right: none;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;
