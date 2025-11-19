import { Box, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { loadingSpinnerStyles } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = memo(({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <Box sx={loadingSpinnerStyles.container}>
      <Box sx={loadingSpinnerStyles.content}>
        <Box sx={loadingSpinnerStyles.spinner}></Box>
        {message && <Text sx={loadingSpinnerStyles.message}>{message}</Text>}
      </Box>
    </Box>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
