const config = require("../../config/env");
const User = require("../models/User");
const Schedule = require("../models/Schedule");

User.schedules = User.belongsToMany(Schedule, { as: 'schedules', through: 'user_schedules', foreignKey: 'userId', allowNull: true });

class ScheduleController {
  create(req, res, next) {
    let obj = req.body.data;
    return Schedule.create(obj)
      .then((savedObject) => {
        const scheduleId = savedObject.sheduleId;
        return savedObject.setOwner(req.user)
          .then(schedule => {
            return Schedule.findAll({
              where: {
                sheduleId: scheduleId
              },
              include: [
                { model: User, as: 'owner' }
              ]
            })
          })
          .then(schedule => {
            return res.ok({ data: schedule});
          });
      })
      .catch(err => {
        return res.forbidden(err)
      });
  }
  getlist(req, res, next) {
    const userId = req.user.userId;
    return User.findAll({ 
        /* where: {
          userId: userId
        }, */
        include: [
          { model: Schedule, as: 'schedules' }
        ]
      })
      .then(schedule => {
        if (!user.schedules || !user.schedules.length) {
          throw new Error("Schedule not found");
        }
        else {
          res.ok({ data: user.schedules});
        }
      })      
      .catch(err => {
        return res.forbidden(err.message)
      });
  }
  join(req, res, next) {
    const sheduleId = req.param.scheduleId;
    return models.Schedule.findOne({ id: scheduleId, status: ["NEW", "PENDING"]})
      .then(schedule => {
        if (!schedule) {
          throw new Error("Schedule not found or been completed");
        }
        else {
          schedule.users.push(req.user.id)
          return schedule.save()
            .then(result => {
              if (!result) {
                throw new Error("Invalid password or email");
              }
            });
        }
      })
      .catch(error => next(error.message));
  }
}

module.exports = ScheduleController;