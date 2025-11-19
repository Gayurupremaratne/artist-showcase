import { Box, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { errorMessageStyles } from './ErrorMessage.styles';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = memo(({ title = 'Error', message, onRetry }: ErrorMessageProps) => {
  return (
    <Box sx={errorMessageStyles.container}>
      <Box sx={errorMessageStyles.alert}>
        <Box sx={errorMessageStyles.icon}>⚠</Box>
        <Box sx={errorMessageStyles.content}>
          <Text sx={errorMessageStyles.title}>{title}</Text>
          <Text sx={errorMessageStyles.message}>{message}</Text>
          {onRetry && (
            <Box as="button" sx={errorMessageStyles.retryButton} onClick={onRetry}>
              Try again
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
});

ErrorMessage.displayName = 'ErrorMessage';
