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
      console.log("accepted");
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async (req, res) => {
  const {
    method,
    query: { slug },
  } = req;
  await runMiddleware(req, res, cors);
  let catId = slug[0],
    id = slug[1];
  if (method === "GET") {
    if (!id || !catId) {
      res.status(401).json({
        msg: !catId ? "Category id is missing" : "Id is missing",
      });
    }
    let category = JSON.parse(JSON.stringify(DATA[catId - 1]));
    console.log(category);
    if (category.id) {
      let project = category.projects[id - 1];
      console.log(catId, id);
      if (project.id) {
        category.project = project;
        delete category.projects;
        return res.status(200).json(category);
      } else return res.status(401).json({ msg: "Project doesn't exist" });
    } else return res.status(401).json({ msg: "Category doesn't exist" });
  }
};
