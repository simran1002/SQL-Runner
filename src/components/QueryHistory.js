import React from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '0' : '-320px')};
  top: 0;
  width: 320px;
  height: 100vh;
  background: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 20px;
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
`;

const HistoryToggle = styled.button`
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '320px' : '0')};
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  border-radius: 4px 0 0 4px;
  transition: all 0.3s ease;

  &:hover {
    padding-bottom: 20px;
  }
`;

const HistoryItem = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.background};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-5px);
    box-shadow: ${({ theme }) => theme.shadow};
  }

  .timestamp {
    font-size: 0.8em;
    color: ${({ theme }) => theme.text}aa;
    margin-bottom: 4px;
  }

  .query {
    font-family: monospace;
    font-size: 0.9em;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

const ClearButton = styled.button`
  background: ${({ theme }) => theme.error || '#dc3545'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const QueryHistory = ({ isOpen, toggleHistory, history, onSelectQuery, onClearHistory }) => {
  return (
    <>
      <HistoryToggle isOpen={isOpen} onClick={toggleHistory}>
        {isOpen ? 'Hide History' : 'Show History'}
      </HistoryToggle>
      <HistoryContainer isOpen={isOpen}>
        <h2>Query History</h2>
        <ClearButton onClick={onClearHistory}>Clear History</ClearButton>
        {history.map((item, index) => (
          <HistoryItem key={index} onClick={() => onSelectQuery(item.query)}>
            <div className="timestamp">{new Date(item.timestamp).toLocaleString()}</div>
            <div className="query">{item.query.slice(0, 100)}...</div>
          </HistoryItem>
        ))}
      </HistoryContainer>
    </>
  );
};

export default QueryHistory;
