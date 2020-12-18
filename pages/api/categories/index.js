// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from "cors";
import DATA from "../../../public/categories.json";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req, res) => {
  await runMiddleware(req, res, cors);
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    let newData = JSON.parse(JSON.stringify(DATA));
    for (let i = 0; i < newData.length; i++) {
      const element = newData[i];
      delete element.projects;
    }
    let categories = newData;

    res.status(200).json(categories);
  }
};
