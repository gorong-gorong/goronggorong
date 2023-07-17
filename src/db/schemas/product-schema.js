import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Product', ProductSchema);
