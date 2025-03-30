# SQL Query Visualizer

A web-based application for running SQL queries and visualizing their results. This project provides a modern, efficient interface for data analysts to work with SQL queries and view their results in a tabular format.

## Project Overview

This application allows users to:

- Write SQL queries in a feature-rich code editor
- Choose from predefined example queries
- View query results in a performant data table
- Toggle between different queries and their corresponding results

## Technical Stack

- **Framework**: React (Create React App)
- **Major Dependencies**:
  - `styled-components` for styling
  - `@monaco-editor/react` for the SQL code editor
  - React's built-in state management

## Performance Metrics

### Page Load Time

- Initial page load: ~1.5s
- Time to interactive: ~2s

These metrics were measured using Chrome DevTools Performance tab and Lighthouse.

### Performance Optimizations

1. Code splitting for the Monaco editor
2. Virtualized table rendering for large datasets
3. Memoization of expensive computations
4. Lazy loading of components

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Build for production: `npm run build`

## Features

- Modern SQL editor with syntax highlighting
- Example query selection
- Responsive table view for query results
- Clean, minimalist UI design
- Support for large datasets
- Fast re-rendering and state updates
