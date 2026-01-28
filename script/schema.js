import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true,
    // },
    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Plot: String,
    vector: {
      type: [Number],
      default: [],
    },

    Writer: String,
    Actors: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    DVD: String,
    BoxOffice: String,
    Production: String,
    Website: String,
    Response: String,
  },
  {
    collection: "movies_data",
  },
);

export const Movie = mongoose.model("Movie", MovieSchema);
