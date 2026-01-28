import mongoose from "mongoose";
import { Movie } from "./schema.js";
import { Mistral } from "@mistralai/mistralai";
import { config } from "dotenv";
config();

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

const MONGO_URI =
  "";

const connection = async () => {
  try {
    console.log("starting connection");
    await mongoose.connect(MONGO_URI);
    console.log("connection successful");


    const movies = await Movie.find({
      $or: [{ vector: { $exists: false } }, { vector: { $size: 0 } }],
    });


    const BATCH_SIZE = 10;

for (let i = 0; i < movies.length; i += BATCH_SIZE) {
  const batch = movies.slice(i, i + BATCH_SIZE);

  const plots = batch.map(m => m.Plot || "");

  console.log(
    `Processing batch ${i / BATCH_SIZE + 1} (${batch.length} items)`
  );

  const embeddings = await getEmbeddingsBatch(plots);

  const bulkOps = batch.map((movie, idx) => ({
    updateOne: {
      filter: { _id: movie._id },
      update: { $set: { vector: embeddings[idx] } },
    },
  }));

  await Movie.bulkWrite(bulkOps);
}

  } catch (error) {
    console.log("Error" + error.message);
  } finally {
    await mongoose.connection.close();
    console.log("👋 Script finished.");
  }
};

// connection();

async function getEmbeddings(plot) {
  try {
    const embeddingsBatchResponse = await client.embeddings.create({
      model: "mistral-embed",
      inputs: plot,
    });
    return embeddingsBatchResponse.data[0].embedding;
  } catch (error) {
    console.log(error.message);
  }
}

async function getEmbeddingsBatch(plots) {
  try {
    const response = await client.embeddings.create({
      model: "mistral-embed",
      inputs: plots,
    });

    return response.data.map(d => d.embedding);
  } catch (error) {
    console.error("Embedding error:", error.message);
    throw error;
  }
}

// getEmbeddings('hi')
