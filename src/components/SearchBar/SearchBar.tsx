import { Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { memo } from 'react';
import { searchBarStyles } from './SearchBar.styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void;
}

export const SearchBar = memo(({ value, onChange, placeholder = 'Search songs or albums...', onSearch }: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <Box sx={searchBarStyles.container}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FaSearch style={searchBarStyles.icon} />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          size="lg"
          sx={searchBarStyles.input}
        />
      </InputGroup>
    </Box>
  );
});

SearchBar.displayName = 'SearchBar';
