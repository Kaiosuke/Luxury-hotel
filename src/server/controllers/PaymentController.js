import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import {
  handleError500,
  handleSuccess200,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import qs from "qs";
import Cart from "../models/Cart.js";

const config = {
  app_id: "2553",
  key1: env.KEY_PAYMENT_1,
  key2: env.KEY_PAYMENT_2,
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

const url =
  "https://27dd-2001-ee0-40e1-da25-6c4e-95e4-5849-874b.ngrok-free.app";

const PaymentController = {
  payment: async (req, res) => {
    const { cartIds, totalMoney } = req.body;
    const embed_data = {
      cartIds,
      redirecturl: "http://localhost:3000/booking/success",
    };

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: totalMoney,
      description: `Zalo - Payment for the order #${transID}`,
      bank_code: "",
      callback_url: `${url}/payment/callback`,
    };

    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;

    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    try {
      const result = await axios.post(config.endpoint, qs.stringify(order), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      return handleSuccess200(res, result.data);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  callback: async (req, res) => {
    let result = {};

    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

      if (reqMac !== mac) {
        result.return_code = -1;
        result.return_message = "mac not equal";
        console.log("failed");
        return res.json({
          return_code: -1,
          return_message: "mac not equal",
        });
      } else {
        let dataJson = JSON.parse(dataStr, config.key2);

        const { cartIds } = JSON.parse(dataJson.embed_data);

        await Cart.updateMany(
          { _id: { $in: cartIds } },
          { $set: { status: "paid" } }
        );

        result.return_code = 1;
        result.return_message = "success";
        return res.json({
          return_code,
          return_message,
          dataJson,
        });
      }
    } catch (error) {
      result.return_code = 0;
      return handleError500(res, error);
    }
  },

  orderStatus: async (req, res) => {
    const { id } = req.params;
    let postData = {
      app_id: config.app_id,
      app_trans_id: id,
    };

    let data =
      postData.app_id + "|" + postData.app_trans_id + "|" + config.key1;
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
      method: "post",
      url: "https://sb-openapi.zalopay.vn/v2/query",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(postData),
    };
    try {
      const result = await axios(postConfig);
      return handleSuccess200(res, result.data);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default PaymentController;
