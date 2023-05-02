import { RequestHandler } from "express";
import ActivityModel from "../../models/activity.model";

export const allActivities: RequestHandler = async (req, res) => {
  try {
    const payload = res.locals.payload;
    const userId = payload.userId;
    const activity = await ActivityModel.findOne({ userId: userId });
    res.send({ status: true, msg: `All activities`, activity });
  } catch (error) {}
};

export const removeActivities: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.payload;
    const userId = payload.userId;
    ActivityModel.updateOne(
      { userId: userId }, // Filter for the document
      { $pull: { activity: { _id: id } } } // Remove the element from the array
    )
      .then((result) => {
        console.log(`Removed  element(s) from the array`);
        res.send({ status: true, msg: `removed` });
      })
      .catch((error) => {
        console.error(`Error deleting array element: ${error}`);
      });
  } catch (error) {}
};
