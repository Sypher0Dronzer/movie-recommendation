import Link from "next/link";
import React from "react";
import { House, Search } from "lucide-react";
import { redirect } from "next/navigation";

const SearchInput = () => {
  async function searchAction(formData: FormData) {
    "use server";

    const searchTerm = formData.get("searchTerm") as string;

    redirect(`/search/${searchTerm}`);
  }
  return (
    <div className="flex justify-center max-w-6xl sm:px-8 px-4 gap-2 items-center w-full ">
<Link href="/" className="">
        <House className="size-5 sm:size-6 text-gray-300" />
      </Link>
    <form
      action={searchAction}
      className="w-full  flex items-center sm:pr-5 pr-3 py-2 rounded-full border-white/20 bg-white/15 backdrop-blur-2xl border shadow-lg"
    >
      
      <input
        type="text"
        className="flex-1 sm:px-5 px-2 outline-none sm:text-md text-xs  "
        name="searchTerm"
        placeholder="What type of film do you like? e.g. Sci-Fi films in space..."
      />
      <Search className="size-4 sm:size-5 text-gray-300"/>
    </form>
    </div>
  );
};

export default SearchInput;
