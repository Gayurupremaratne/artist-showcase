import { Box, Button, Text } from '@chakra-ui/react';
import { paginationStyles } from './Pagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination = ({ currentPage, totalPages, total, loading, onPrevious, onNext }: PaginationProps) => {
  return (
    <Box sx={paginationStyles.pagination}>
      <Button sx={paginationStyles.button} onClick={onPrevious} disabled={currentPage === 1 || loading}>
        Previous
      </Button>
      <Text sx={paginationStyles.info}>
        Page {currentPage} of {totalPages} ({total} total albums)
      </Text>
      <Button sx={paginationStyles.button} onClick={onNext} disabled={currentPage === totalPages || loading}>
        Next
      </Button>
    </Box>
  );
};
