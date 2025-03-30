import React, { useState, useCallback, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './components/GlobalStyles';
import QueryHistory from './components/QueryHistory';
import QueryBuilder from './components/QueryBuilder';
import CommandPalette from './components/CommandPalette';
import ToastManager from './components/Toast';
import {
  AppContainer,
  Header,
  ThemeToggle,
  EditorContainer,
  QuerySection,
  ResultsSection,
  QueryControls,
  Button,
  Select,
  Table,
  ShortcutHint
} from './components/StyledComponents';


const SAMPLE_QUERIES = {
  'Select All Users': {
    query: 'SELECT * FROM users;',
    result: {
      columns: ['id', 'name', 'email', 'created_at'],
      rows: [
        [1, 'Rushi Trivedi', 'rushi123@gmail.com', '2025-01-01'],
        [2, 'Muralidhar Goparaju', 'murali123@gmail.com', '2025-01-02'],
        [3, 'Ashish Sharma', 'ashish123@gmail.com', '2025-01-03'],
        [4, 'Nitish Chhabra', 'nitish123@example.com', '2025-01-03'],
      ]
    }
  },
  'User Orders': {
    query: 'SELECT users.name, orders.order_id, orders.total\nFROM users\nJOIN orders ON users.id = orders.user_id;',
    result: {
      columns: ['name', 'order_id', 'total'],
      rows: [
        ['Omee Rai', 'ORD-001', '$150.00'],
        ['Tanya Sehgal', 'ORD-002', '$89.99'],
        ['Neha Singh', 'ORD-003', '$299.99'],
      ]
    }
  },
  'Product Analytics': {
    query: 'SELECT category, COUNT(*) as count, AVG(price) as avg_price\nFROM products\nGROUP BY category\nORDER BY count DESC;',
    result: {
      columns: ['category', 'count', 'avg_price'],
      rows: [
        ['Electronics', 150, '$599.99'],
        ['Books', 120, '$24.99'],
        ['Clothing', 100, '$49.99'],
      ]
    }
  }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [selectedQuery, setSelectedQuery] = useState(Object.keys(SAMPLE_QUERIES)[0]);
  const [editorContent, setEditorContent] = useState(SAMPLE_QUERIES[selectedQuery].query);
  const [queryResult, setQueryResult] = useState(SAMPLE_QUERIES[selectedQuery].result);
  const [queryHistory, setQueryHistory] = useState(() => {
    const saved = localStorage.getItem('queryHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('queryHistory', JSON.stringify(queryHistory));
  }, [queryHistory]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const handleQueryChange = useCallback((event) => {
    const newQuery = event.target.value;
    setSelectedQuery(newQuery);
    setEditorContent(SAMPLE_QUERIES[newQuery].query);
    setQueryResult(SAMPLE_QUERIES[newQuery].result);
  }, []);

  const handleEditorChange = useCallback((value) => {
    setEditorContent(value);
  }, []);

  const handleRunQuery = useCallback(async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setQueryResult(SAMPLE_QUERIES[selectedQuery].result);
      
      setQueryHistory(prev => [{
        query: editorContent,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 19)]);
      
      showToast('Query executed successfully!', 'success');
    } catch (error) {
      showToast('Failed to execute query. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedQuery, editorContent, showToast]);

  const handleExportResults = useCallback(() => {
    try {
      const headers = queryResult.columns.join(',');
      const rows = queryResult.rows.map(row => row.join(',')).join('\n');
      const csvContent = `${headers}\n${rows}`;
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'query_results.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      showToast('Results exported successfully!', 'success');
    } catch (error) {
      showToast('Failed to export results. Please try again.', 'error');
    }
  }, [queryResult, showToast]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleHistory = () => setIsHistoryOpen(prev => !prev);
  const toggleBuilder = () => setIsBuilderOpen(prev => !prev);
  
  const handleHistorySelect = (query) => {
    setEditorContent(query);
    setIsHistoryOpen(false);
    showToast('Query loaded from history', 'info');
  };

  const handleClearHistory = () => {
    setQueryHistory([]);
    showToast('Query history cleared', 'info');
  };

  const handleGenerateQuery = (query) => {
    setEditorContent(query);
    setIsBuilderOpen(false);
    showToast('Query generated successfully', 'success');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunQuery();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleRunQuery]);

  const commands = [
    {
      title: 'Run Query',
      shortcut: 'Ctrl+Enter',
      icon: '▶️',
      keywords: ['execute', 'run', 'query'],
      action: handleRunQuery
    },
    {
      title: 'Toggle Dark Mode',
      shortcut: 'Ctrl+D',
      icon: isDarkMode ? '🌞' : '🌙',
      action: toggleTheme
    },
    {
      title: 'Show Query History',
      shortcut: 'Ctrl+H',
      icon: '📜',
      action: toggleHistory
    },
    {
      title: 'Open Query Builder',
      shortcut: 'Ctrl+B',
      icon: '🔧',
      action: toggleBuilder
    },
    {
      title: 'Export Results',
      shortcut: 'Ctrl+E',
      icon: '📥',
      action: handleExportResults
    }
  ];

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <h1>SQL Query Visualizer</h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <ShortcutHint>Press Ctrl+K for commands</ShortcutHint>
            <ThemeToggle onClick={toggleTheme}>
              {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </ThemeToggle>
          </div>
        </Header>
        
        <EditorContainer>
          <QuerySection>
            <QueryControls>
              <Select value={selectedQuery} onChange={handleQueryChange}>
                {Object.keys(SAMPLE_QUERIES).map((query) => (
                  <option key={query} value={query}>
                    {query}
                  </option>
                ))}
              </Select>
              <Button onClick={handleRunQuery} disabled={isLoading}>
                {isLoading ? 'Running...' : 'Run Query'} {isLoading ? '⌛' : '▶️'}
              </Button>
              <Button onClick={handleExportResults}>Export CSV 📥</Button>
            </QueryControls>
            
            <Editor
              height="100%"
              defaultLanguage="sql"
              value={editorContent}
              onChange={handleEditorChange}
              theme={isDarkMode ? 'vs-dark' : 'vs-light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                quickSuggestions: true,
                suggestOnTriggerCharacters: true,
              }}
            />
          </QuerySection>

          <ResultsSection>
            <Table>
              <thead>
                <tr>
                  {queryResult.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </ResultsSection>
        </EditorContainer>

        <QueryHistory
          isOpen={isHistoryOpen}
          toggleHistory={toggleHistory}
          history={queryHistory}
          onSelectQuery={handleHistorySelect}
          onClearHistory={handleClearHistory}
        />

        <QueryBuilder
          isOpen={isBuilderOpen}
          toggleBuilder={toggleBuilder}
          onGenerateQuery={handleGenerateQuery}
        />

        <CommandPalette
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
          commands={commands}
        />

        <ToastManager
          toasts={toasts}
          removeToast={removeToast}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
