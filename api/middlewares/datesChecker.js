const database = require("../../config/database.js");

module.exports = (req, res, next) => {
  let shortPath = req.path.split("/").slice(0, 2).join("/");
  switch (shortPath) {
    case "/create":
      const when = req.body.data.when;
      const checkTime =  new Date().getTime() + (1000 * 60 * 60);
      if (when >= checkTime) {
        next();
        return null;
      }
      else {
        res.badRequest("Schedule end date must current time plus 1 hour.")
      }
      break;
    case "/join":
      database.Schedule.findOne({
        where: { scheduleId: +req.params.scheduleId, status: "OPENED" },
        attributes: { exclude: [ "createdAt", "updatedAt" ]}
      })
        .then(schedule => {
          if(schedule) {
            const checkTime =  new Date().getTime();
            const when = schedule.when;
            if (when > checkTime) {
              req.schedule = schedule;
              next();
              return null;
            }
            else {
              schedule.status = "CANCELLED";
              schedule.save()
                .then(() => {
                  res.badRequest("Schedule join time is ower.")
                })
                .catch(err => {
                  throw new Error(err.message);
                });
            }
          }
          else res.badRequest("Schedule closed for join or not found.");
        })
        .catch(err => {
          console.log("DB error", err.message);
          res.serverError();
        })     
      break;  
    default:
      res.serverError();
      break;
  }
};
