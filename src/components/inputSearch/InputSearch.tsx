'use client'
import { Dispatch, SetStateAction, useState } from "react";
import styles from './InputSearch.module.scss'
import { SearchIcon } from "../../components/searchIcon/SearchIcon";

interface InputSearchProps {
  onSearchedValue: Dispatch<SetStateAction<string>>;
  inputId: string;
  label: string;
}


export default function InputSearch({
  inputId,
  label,
  onSearchedValue
}: InputSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const onChange = (value: string) => {
    setInputValue(value);
    onSearchedValue(value);
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