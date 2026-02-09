//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
console.log(' --------------------------entered backend--------------')

const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q'); 

  if(!query) return NextResponse.json({suggestions:[]});
console.log(' --------------------------query parsed--------------')
  const data = await prisma.$runCommandRaw({
     aggregate: "movies_data",
    pipeline: [

        {
      $search: {
        "index": "autocomplete", // optional, defaults to "default"
        "autocomplete": {
          "query": query,
          "path": "Title",
          "tokenOrder": "sequential",
        //   "fuzzy":  {"maxEdits": 1, "prefixLength": 1, "maxExpansions": 20},
    
        }
      },
    },
    {$project:{
      "Title":1,
      "id":1,
      "_id":0
    }}
    ],
cursor: {},}
  )
console.log(' --------------------------recerived data from mongo for autocpmplete--------------')

  const listObj= data?.cursor?.firstBatch 
  const suggestions = listObj.map((e)=> e["Title"])

  return NextResponse.json({suggestions});
}