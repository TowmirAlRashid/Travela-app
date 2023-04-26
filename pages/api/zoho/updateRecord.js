import axios from "axios";

export default async function handler(req, res) {
  try {
    const accessToken = await axios.get(process.env.ACCESSTOKEN_URL);

    let url = `https://www.zohoapis.com/crm/v2/${req.body.moduleName}/${req.body.id}`;

    let updatedFieldObj = req.body.updatedField;

    let requestBody = {};
    let recordArray = [];
    // console.log({ url });
    recordArray.push(updatedFieldObj);

    requestBody["data"] = recordArray;

    let trigger = ["workflow"];
    requestBody["trigger"] = trigger;

    let response = await axios.put(url, requestBody, {
      headers: {
        Authorization: accessToken?.data?.access_token,
      },
    });

    if (response.data?.data) {
      console.log(response.data?.data);
      await res.json({
        status: response.status,
        message: "Record updated successfully!",
      });
      return;
    } else {
      await res.json({
        status: 404,
        message: "Record not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error Response ", error);
    await res.json({ status: "error", message: error });
    return;
  }
}
