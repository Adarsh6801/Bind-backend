import { RequestHandler } from "express";
import { CourseModel } from "../../models/course.model";
import { UserModel } from "../../models/user.model";
import { RoleModel } from "../../models/role.model";
import { UserCourseModel } from "../../models/userCourse.model";
import cron from "node-cron";
import { CourseProgressModel } from "../../models/courseprogress.model";

export const getCourseById: RequestHandler = async (req, res) => {
  try {
    const payload = res.locals.payload;
    const userId = payload.userId;
    const { id } = req.params;
    await CourseModel.findById({ _id: id })
      .populate("topic")
      .then(async (course) => {
        await UserModel.findById({ _id: userId }).then((user) => {
          if (course?.courseName == user?.currentCourse) {
            res.send({
              msg: "you selected course without mentor",
              currentCourse: true,
              status: true,
              course,
            });
          } else {
            res.send({
              status: false,
              msg: "You have already on course Please complete it or cancel for attending these course",
              currentCourse: true,
              userAttemptingAnother: true,
            });
          }
        });
      });
  } catch (error) {
    console.log(error);
  }
};
export const getCourseWithoutMentor: RequestHandler = async (req, res) => {
  try {
    let date = new Date();
    const { id } = req.params;
    console.log(id, "ididid");
    const userId = res.locals.payload.userId;
    console.log(userId, "userid id");

    await CourseModel.findById({ _id: id }).then(async (course) => {
      const userCourse = {
        courseName: course?.courseName,
        date: date,
        isCompleted: false,
        activeCourse: true,
        days: 1,
      };
      const usercourse = await UserCourseModel.findOne({ userId: userId });
      if (usercourse) {
        console.log("hii");

        await UserCourseModel.findOneAndUpdate(
          { userId: userId },
          { $push: { coursesOfUser: userCourse } }
        ).then(async (usercourse) => {
          console.log(usercourse, "usercourse");
          console.log(course, "course");
        });
      } else {
        console.log("helo");
        await new UserCourseModel({
          userId: userId,
          coursesOfUser: userCourse,
        })
          .save()
          .then((usercourse) => {
            console.log(usercourse, "user course");
          });
      }

      await UserModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { currentCourse: course?.courseName } }
      );
      await RoleModel.findOneAndUpdate(
        { userId: userId },
        { $set: { isCurrentCourse: true } }
      );
      res.send({ msg: "you selected course without mentor", status: true });
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUser: RequestHandler = async (req, res) => {
  try {
    console.log("hiii");

    const payload = res.locals.payload;
    const userId = payload.userId;
    console.log(userId, "user is si sis issssiddd");

    await RoleModel.findOne({ userId: userId })
      .populate("userId")
      .then((user) => {
        console.log(user, "user is herere");

        res.send({ user, status: true });
      });
  } catch (error) {}
};

export const exitCourse: RequestHandler = async (req, res) => {
  try {
    const payload = res.locals.payload;
    const userId = payload.userId;
    console.log(userId);
    await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { currentCourse: "" } }
    );
    await RoleModel.findOneAndUpdate(
      { userId: userId },
      { $set: { isCurrentCourse: false } }
    );
    await UserCourseModel.findOneAndUpdate(
      { userId: userId, "coursesOfUser.activeCourse": true },
      { $set: { "coursesOfUser.$.activeCourse": false } }
    ).then((course) => {
      console.log(course, "couseee");

      res.send({
        course,
        status: true,
        msg: `You are exit from the ${course?.coursesOfUser[0].courseName}`,
      });
    });
  } catch (error) {}
};

export const userCurrentCourse: RequestHandler = async (req, res) => {
  try {
    console.log("hii");

    const payload = res.locals.payload;
    const userId = payload.userId;
    console.log(userId);

    await UserModel.findById({ _id: userId }).then(async (user) => {
      console.log(user, "user user");

      const currentCourse = user?.currentCourse;
      if (currentCourse) {
        await CourseModel.findOne({ courseName: currentCourse })
          .populate("topic")
          .then(async (course) => {
            console.log(course, "course course");
            await UserCourseModel.findOne({ userId: userId }).then(
              async (usercourse: any) => {
                console.log(usercourse, "usercourse");

                const activeCourses = await usercourse.coursesOfUser.filter(
                  (course: any) => course.activeCourse
                );
                console.log(activeCourses, "active curse");
                await CourseProgressModel.findOne({ userId: userId }).then(
                  (progress: any) => {
                    console.log(progress, "progress...");
                    if (progress) {
                      const completedTopics = progress.courseProgress.filter(
                        (completeTasks: any) => completeTasks.pass
                      );
                      res.send({
                        status: true,
                        msg: `You have the course ${course?.courseName}`,
                        activeCourses,
                        course,
                        completedTopics,
                        progress,
                      });
                    } else {
                      res.send({
                        status: true,
                        msg: `You have the course ${course?.courseName}`,
                        activeCourses,
                        course,
                        completedTopics: 0,
                      });
                    }
                  }
                );
              }
            );
          });
      } else {
        res.send({ status: false, msg: "You doon't have any current course" });
      }
    });
  } catch (error) {}
};

export const getCourseWithMentor: RequestHandler = (req, res) => {
  try {
    const{id}=req.params
    console.log(id,'ididid');
    
  } catch (error) {

  }
};

// Run the job every day at midnight
cron.schedule("0 0 * * *", async () => {
  // Find all user course documents that have active courses
  const userCourseDocs = await UserCourseModel.find({
    "coursesOfUser.activeCourse": true,
  });

  // Update the date of each active course in the array
  userCourseDocs.forEach(async (userCourseDoc) => {
    userCourseDoc.coursesOfUser.forEach((course) => {
      if (course.activeCourse) {
        course.date.setDate(course.date.getDate() + 1);
      }
    });

    // Save the updated document
    await userCourseDoc.save();
  });
});
