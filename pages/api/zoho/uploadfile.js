// import axios from "axios";
// import FormData from "form-data";
// import formidable from "formidable";
// import fs from "fs";
// // set bodyparser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   try {
//     // console.log({ test: req });
//     const accessToken = await axios.get(process.env.ACCESSTOKEN_URL);
//     console.log({ test2: accessToken });

//     await res.json({
//       status: 202,
//       message: "Record file successfully!",
//     });

//     // const promise = new Promise((resolve, reject) => {
//     //   let form = new formidable.IncomingForm();
//     //   form.keepExtensions = true;
//     //   form.parse(req, (err, fields, files) => {
//     //     if (err) reject(err);
//     //     resolve({ fields, files });
//     //   });
//     // });

//     // // //read fields and files
//     // const { fields, files } = await promise;

//     // let requestBody = new FormData();
//     // requestBody.append("file", fs.createReadStream(files?.file?.path));

//     // const updateResp = await axios.post(
//     //   `https://www.zohoapis.com/crm/v2/Contacts/${fields?.id}/Attachments`,
//     //   requestBody,
//     //   {
//     //     headers: {
//     //       ...requestBody.getHeaders(),
//     //       Authorization: accessToken,
//     //     },
//     //     encoding: "utf8",
//     //     throwHttpErrors: false,
//     //   }
//     // );

//     // console.log(updateResp?.data);
//     // await res.json({
//     //   status: updateResp.status,
//     //   message: "File uploaded successfully",
//     // });
//     return;
//   } catch (error) {
//     console.log("Error Response ", error);
//     await res.json({ status: "error", message: error });
//     return;
//   }
// }
