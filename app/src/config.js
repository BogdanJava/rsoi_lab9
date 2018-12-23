define([], function() {
  return {
    PORT: 3000,
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_HOST: process.env.MONGO_HOST || "localhost",
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || "employees",
    VIEW_DIR: 'src/views'
  };
});
