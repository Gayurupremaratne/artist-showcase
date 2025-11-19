import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { memo } from 'react';
import styles from './SearchBar.module.css';

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
    <div className={styles.searchContainer}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FaSearch className={styles.searchIcon} />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          size="lg"
          className={styles.searchInput}
        />
      </InputGroup>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
