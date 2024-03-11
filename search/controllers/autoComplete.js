const { connect_M_DB } = require('../databases/db');

const search = async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await connect_M_DB(process.env.MONGOOSE_URL);
    
    const database = client.db(process.env.DB_NAME); // Assuming you have DB_NAME in your environment variables
    
    // Connect to the movies collection 
    const collection = database.collection("movies"); 
    
    // Perform search query
    const ans = await collection.find({ "title": "saini" }).toArray();

    console.log('Received query:', 'saini');

    // Close the MongoDB connection
    await client.close();

    res.json({ query: 'saini', result: ans });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { search };
