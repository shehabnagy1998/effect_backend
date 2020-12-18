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
    if (!id) {
      res.status(401).json({ msg: "Id is missing" });
    }

    let category = DATA[id - 1];
    if (category.id) {
      res.status(200).json(category);
    } else res.status(401).json({ msg: "Category doesn't exist" });
  }
};
