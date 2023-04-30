import axios from "axios";

export default async function handler(req, res) {
  try {
    const accessToken = await axios.get(process.env.ACCESSTOKEN_URL);

    console.log(accessToken?.data?.access_token);
    console.log({ req });
    console.log(req.body.moduleName);
    console.log(req.body.id);

    let url = `https://www.zohoapis.com/crm/v4/${req.body.moduleName}/${req.body.id}`;

    let response = await axios.delete(url, {
      headers: {
        Authorization: accessToken?.data?.access_token,
      },
    });

    if (response.data?.data) {
      await res.json({
        status: response.status,
        message: "Record deleted successfully!",
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
