import axios from "axios";

export default async function handler(req, res) {
  try {
    const accessToken = await axios.get(process.env.ACCESSTOKEN_URL);

    let url = `https://www.zohoapis.com/crm/v2/${req.body.moduleName}`;

    let updatedFieldObj = req.body.updatedField;

    let requestBody = {};
    let recordArray = [];

    //console

    recordArray.push(updatedFieldObj);

    requestBody["data"] = recordArray;

    let trigger = ["workflow"];
    requestBody["trigger"] = trigger;

    let response = await axios.post(url, requestBody, {
      headers: {
        Authorization: accessToken?.data?.access_token,
      },
    });

    if (response.data?.data) {
      console.log({ t: response.data });
      await res.json({
        status: response.status,
        details: response.data,
        message: "Record created successfully!",
      });
      return;
    } else {
      await res.json({
        status: 500,
        message: "Record could not be created!",
      });
      return;
    }
  } catch (error) {
    console.log("Error Response ", error);
    await res.json({ status: "error", message: error });
    return;
  }
}
