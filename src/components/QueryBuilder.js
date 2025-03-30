import React, { useState } from 'react';
import styled from 'styled-components';

const BuilderContainer = styled.div`
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '0' : '-400px')};
  top: 0;
  width: 400px;
  height: 100vh;
  background: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 20px;
  transition: left 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
`;

const BuilderToggle = styled.button`
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '400px' : '0')};
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  border-radius: 0 4px 4px 0;
  transition: all 0.3s ease;

  &:hover {
    padding-bottom: 20px;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const QueryBuilder = ({ isOpen, toggleBuilder, onGenerateQuery }) => {
  const [table, setTable] = useState('users');
  const [columns, setColumns] = useState(['*']);
  const [condition, setCondition] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [limit, setLimit] = useState('');

  const handleGenerate = () => {
    let query = `SELECT ${columns.join(', ')} FROM ${table}`;
    
    if (condition) {
      query += ` WHERE ${condition}`;
    }
    
    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }
    
    if (limit) {
      query += ` LIMIT ${limit}`;
    }
    
    query += ';';
    onGenerateQuery(query);
  };

  return (
    <>
      <BuilderToggle isOpen={isOpen} onClick={toggleBuilder}>
        {isOpen ? 'Hide Builder' : 'Query Builder'}
      </BuilderToggle>
      <BuilderContainer isOpen={isOpen}>
        <h2>Query Builder</h2>
        
        <Section>
          <Label>Table</Label>
          <Select value={table} onChange={(e) => setTable(e.target.value)}>
            <option value="users">Users</option>
            <option value="orders">Orders</option>
            <option value="products">Products</option>
          </Select>
        </Section>

        <Section>
          <Label>Columns (comma-separated)</Label>
          <Input
            type="text"
            value={columns.join(', ')}
            onChange={(e) => setColumns(e.target.value.split(',').map(c => c.trim()))}
            placeholder="*"
          />
        </Section>

        <Section>
          <Label>WHERE Condition</Label>
          <Input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="age > 18"
          />
        </Section>

        <Section>
          <Label>ORDER BY</Label>
          <Input
            type="text"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            placeholder="id DESC"
          />
        </Section>

        <Section>
          <Label>LIMIT</Label>
          <Input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="10"
          />
        </Section>

        <Button onClick={handleGenerate}>Generate Query</Button>
      </BuilderContainer>
    </>
  );
};

export default QueryBuilder;
