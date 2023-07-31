FROM mongo:4.4

COPY ./data/product-data.json /data
CMD mongoimport --host mongodb\
  --db ${MONGODB_NAME}\
  --collection products\
  --type json\
  --file /data/product-data.json --jsonArray\
  --username=${MONGO_INITDB_ROOT_USERNAME}\
  --password=${MONGO_INITDB_ROOT_PASSWORD}
