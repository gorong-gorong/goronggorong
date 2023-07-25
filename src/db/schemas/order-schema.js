import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      requestMessage: {
        type: String,
      },
    },
    products: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    totalCase: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      paymentType: {
        // credit, account
        // "card", "account"
        type: String,
        required: true,
      },
      creditInfo: {
        company: {
          type: String,
        },
        cardNumber: {
          type: String,
        },
        expiryDate: {
          type: String,
        },
        cvc: {
          type: String,
        },
        cardOwner: {
          type: String,
        },
      },
    },
    deliveryStatus: {
      type: String,
      default: '입금대기',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('Order', OrderSchema);
