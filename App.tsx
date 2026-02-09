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
      console.error(err);
      setError("We encountered a temporary disruption in our neural link. Please try again.");
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
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-center animate-fade-in">
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