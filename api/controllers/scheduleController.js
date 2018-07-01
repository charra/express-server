const config = require("../../config/env");
const database = require("../../config/database.js");

class ScheduleController {
  create(req, res, next) {
    let obj = req.body.data;
    
    return database.Schedule.create(obj)
      .then((savedObject) => {
        const scheduleId = savedObject.scheduleId;
        return savedObject.setOwner(req.user)
          .then(schedule => {
            return database.Schedule.findAll({
              where: {
                scheduleId: scheduleId
              },
              attributes: { exclude: [ "createdAt", "updatedAt" ]},
              include: [
                { model: database.User, as: 'owner', attributes: { exclude: [ "createdAt", "updatedAt", "password" ]}}
              ]
            })
          })
          .then(schedule => {
            return res.ok({schedule: schedule[0]});
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