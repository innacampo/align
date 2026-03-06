import React, { useState } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';
import { AlignResponse, LoadingState } from './types';
import { generateAlignContent } from './services/geminiService';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [responseData, setResponseData] = useState<AlignResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(0);

  const handleGenerate = async (situation: string) => {
    setLoadingState('loading');
    setError(null);
    setResponseData(null);

    try {
      const data = await generateAlignContent(situation);
      setResponseData(data);
      setLoadingState('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : "We encountered a temporary disruption. Please try again.";
      setError(message);
      setLoadingState('error');
    }
  };

  const handleReset = () => {
    setLoadingState('idle');
    setResponseData(null);
    setError(null);
    setInputKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <Header />
      
      <InputSection 
        key={inputKey}
        onSubmit={handleGenerate} 
        isLoading={loadingState === 'loading'} 
      />

      {loadingState === 'error' && error && (
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center animate-fade-in flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          {error}
        </div>
      )}

      {loadingState === 'success' && responseData && (
        <ResponseSection 
          data={responseData} 
          onReset={handleReset}
        />
      )}
    </Layout>
  );
};

export default App;