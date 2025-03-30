import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
  z-index: 1100;
  backdrop-filter: blur(4px);
`;

const Container = styled.div`
  width: 600px;
  background: ${({ theme }) => theme.surface};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  animation: dropDown 0.2s ease;

  @keyframes dropDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text}aa;
  }
`;

const CommandList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const CommandItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: ${({ isSelected, theme }) => isSelected ? theme.primary + '22' : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.primary + '22'};
  }

  .title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .shortcut {
    display: flex;
    gap: 4px;
  }

  .key {
    padding: 2px 6px;
    background: ${({ theme }) => theme.background};
    border-radius: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.text}dd;
  }
`;

const NoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text}aa;
`;

const CommandPalette = ({ isOpen, onClose, commands }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState(commands);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setFilteredCommands(commands);
    }
  }, [isOpen, commands]);

  useEffect(() => {
    const filtered = commands.filter(cmd => 
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.keywords?.some(k => k.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredCommands(filtered);
    setSelectedIndex(0);
  }, [search, commands]);

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <Container onClick={e => e.stopPropagation()}>
        <SearchInput
          autoFocus
          placeholder="Type a command or search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <CommandList>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <CommandItem
                key={cmd.title}
                isSelected={index === selectedIndex}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
              >
                <div className="title">
                  {cmd.icon}
                  {cmd.title}
                </div>
                {cmd.shortcut && (
                  <div className="shortcut">
                    {cmd.shortcut.split('+').map((key, i) => (
                      <span key={i} className="key">{key}</span>
                    ))}
                  </div>
                )}
              </CommandItem>
            ))
          ) : (
            <NoResults>No matching commands found</NoResults>
          )}
        </CommandList>
      </Container>
    </Overlay>
  );
};

export default CommandPalette;
