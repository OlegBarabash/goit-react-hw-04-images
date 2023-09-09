import {
  SearchButton,
  SearchForm,
  SearchbarHeader,
  SearchButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarHeader>
      <SearchForm onSubmit={onSubmit}>
        <SearchButton type="submit" className="button">
          <BsSearch size={20} />
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};
