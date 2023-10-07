import { Dispatch, SetStateAction, useState } from "react";
import styles from './InputSearch.module.scss'
import { SearchIcon } from "../../components/searchIcon/SearchIcon";
import debounce from 'lodash/debounce';

interface InputSearchProps {
  onSearchedValue: Dispatch<SetStateAction<string>>;
  inputId: string;
  label: string;
}
const DELAY = 800;

export default function InputSearch({
  inputId,
  label,
  onSearchedValue
}: InputSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const debouncedFilter = debounce((value) => {
    onSearchedValue(value);
  }, DELAY);

  const onChange = (value: string) => {
    setInputValue(value);
    debouncedFilter(value);
  }

  return (
    <div className={styles.inputSearchContainer}>
      <div className={styles.inputContainer}>
        <label htmlFor={inputId}>
          <b>
            {label}
          </b>
        </label>
        <input
          id={inputId}
          className={styles.inputSearch}
          type="search"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <SearchIcon />
    </div>
  )
}