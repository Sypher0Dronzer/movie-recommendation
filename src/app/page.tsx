import React, { Suspense } from "react";
import { MoviesGrid } from "../app/components/MoviesGrid";
import { Loader } from "lucide-react";
const page = async () => {
  return (
    <div>
      <div className="flex items-center justify-center pb-24 pt-4  px-4 max-w-6xl mx-auto">
        <Suspense
          fallback={
            <div className="h-[90dvh] flex flex-col gap-3 justify-center items-center">
            <Loader className="animate-spin text-red-700 size-8"/>
            Loading movies...
          </div>
          }
        >
          <MoviesGrid />
          
        </Suspense>
      </div>
    </div>
  );
};

export default page;
