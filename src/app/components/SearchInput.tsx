"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { House, Search } from "lucide-react";
import { redirect } from "next/navigation";
import Autocomplete from "./Autocomplete";
import { useDebounce } from "../hooks/debounce";

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function searchAction(formData: FormData) {
    const searchTerm = formData.get("searchTerm") as string;

    redirect(`/search/${searchTerm}`);
  }
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debounceSearch.length <= 2) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(debounceSearch)}`)
        const data = await response.json()
        setSuggestions(data.suggestions ||[])
      } catch (error) {
        console.error(error)
        setSuggestions([])
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuggestions()

  }, [debounceSearch]);
  return (
    <div className="flex justify-center max-w-6xl sm:px-8 px-4 gap-2 items-center w-full ">
      <Link href="/" className="">
        <House className="size-5 sm:size-6 text-gray-300" />
      </Link>
      <form
        action={searchAction}
        className="w-full relative  flex items-center sm:pr-5 pr-3 py-2 rounded-full border-white/20 bg-white/15 backdrop-blur-2xl border shadow-lg"
      >
        <input
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 sm:px-5 px-2 outline-none sm:text-md text-xs  "
          name="searchTerm"
          placeholder="What type of film do you like? e.g. Sci-Fi films in space..."
        />
        <Search className="size-4 sm:size-5 text-gray-300" />
        <Autocomplete isLoading={isLoading} suggestions={suggestions} isTyping={isFocused} />
      </form>
    </div>
  );
};

export default SearchInput;
