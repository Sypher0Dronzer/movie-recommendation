import React from "react";

interface AutocompleteProps {
  isTyping: boolean;
  isLoading: boolean;
  suggestions: string[];
}

const arr =[
  'Star Wars: Episode V - The Empire Strikes Back',
  'Inglourious Basterds',
  'Million Dollar Baby',
  'The Boat',
  'The Good, the Bad and the Ugly',
  'Back to the Future',
  'Batman Begins',
  'The Batman',
  'Lock, Stock and Two Smoking Barrels',
  'Barry Lyndon'
]
const Autocomplete = ({ isTyping,isLoading, suggestions }: AutocompleteProps) => {
  if (!isTyping) return null;
  
  return (
    <div className={` absolute px-5 sm:text-md text-xs p-2 w-full  bg-white/20 top-full backdrop-blur-2xl  border shadow-lg border-white/20` }>
     { isLoading ? "Loading ... ": (
      suggestions.length>0 ? (
        suggestions.map((a)=>{return(
          <p>{a}</p>
        )})
      ): 'No matches found'
     )} 
      
    </div>
  );
};

export default Autocomplete;
