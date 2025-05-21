import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const MarkdownContainer = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.6;
  
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
  }
  
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    margin-top: 0;
  }
  
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  ul, ol {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }
  }
  
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.accent};
    padding-left: ${({ theme }) => theme.spacing.md};
    margin-left: 0;
    font-style: italic;
  }
  
  code {
    background: ${({ theme }) => theme.colors.background.secondary};
    padding: 0.2em 0.4em;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-family: ${({ theme }) => theme.typography.fontFamily.monospace};
    font-size: 0.9em;
  }
  
  pre {
    background: ${({ theme }) => theme.colors.background.secondary};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.md} 0;
    
    code {
      background: none;
      padding: 0;
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.accent};
`;

interface MarkdownRendererProps {
  filePath: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ filePath }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(filePath);
        
        if (!response.ok) {
          throw new Error(`Failed to load markdown file (${response.status})`);
        }
        
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(`Failed to load content. ${err instanceof Error ? err.message : ''}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  if (isLoading) {
    return <LoadingMessage>Loading content...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <MarkdownContainer>
      <ReactMarkdown>{content}</ReactMarkdown>
    </MarkdownContainer>
  );
};

export default MarkdownRenderer; 