//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q'); 
  if(!query) return NextResponse.json({suggestions:[]});
console.log(' we entered before auto complete')
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
  const listObj= data?.cursor?.firstBatch 
  const suggestions = listObj.map((e)=> e["Title"])

  return NextResponse.json({suggestions});
}