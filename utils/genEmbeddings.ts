import { Mistral } from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

export async function getEmbeddings(plot:string) {
  try {
    const embeddings = await client.embeddings.create({
      model: "mistral-embed",
      inputs: plot,
    });
    return embeddings.data[0].embedding;
  } catch (error) {
    console.log('Something went wrong with embeddings:' +error);
  }
}