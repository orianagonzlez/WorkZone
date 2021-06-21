import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const getDate = (date) => {
  const msgDate = moment(date);

  return msgDate.format("HH:mm | MMMM Do");
};
