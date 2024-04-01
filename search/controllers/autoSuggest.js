require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGOOSE_URL
const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';

async function getMovies(query) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Create the aggregation pipeline with the $search stage
    const pipeline = [
      {
        $search: {
          index: 'default',
          text: {
            query: query ,
            // path: {
            //   wildcard: '*' // Search across all fields
            // }
            path : 'title'
          }
        }
      }
    ];

    const movies = await collection.aggregate(pipeline).toArray();
    return movies;
  } catch (err) {
    console.error('Error retrieving movies:', err);
    throw err;
  } finally {
    await client.close();
  }
}

module.exports = { getMovies };