FROM mongo:4.4

COPY ./data/product-data.json /data
CMD mongoimport --host mongodb --db ${MONGODB_NAME} --collection products --type json --file /data/product-data.json --jsonArray --username=${MONGODB_INIT_ROOT_USERNAME} --password=${MONGODB_INIT_ROOT_PASSWORD}
