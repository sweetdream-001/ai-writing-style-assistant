// All our components in one place - makes imports cleaner

// The main app that ties everything together
export { RephraseApp } from './RephraseApp';

// Page structure components
export { PageLayout } from './layout/PageLayout';

// Core functionality
export { InputSection } from './features/InputSection';
export { ResultsSection } from './features/ResultsSection';

// Reusable UI pieces
export { Button } from './ui/Button';
export { Card } from './ui/Card';
export { StreamingCard } from './ui/StreamingCard';
export { Toggle } from './ui/Toggle';

// Custom hooks and utilities
export { useRephrase } from '../hooks/useRephrase';
export * from '../utils/streamingUtils';
