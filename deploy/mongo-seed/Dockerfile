FROM mongo:4.4

COPY ./data/product-data.json /data
CMD mongoimport --host mongodb --db goronggorong --collection products --type json --file /data/product-data.json --jsonArray
