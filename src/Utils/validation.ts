import { EventDto } from "../Dtos/Event.dto";

export const phoneNumberValidation = (inputTxt: String) => {
  var phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputTxt.valueOf().match(phoneNo)) {
    return true;
  } else {
    return false;
  }
};

export const validateEventDate = (result: EventDto[]) => {
  const validEvents = result.filter((event) => {
    const eventDates = event.eventDate || [];
    return eventDates.every((date) => new Date(date) > new Date());
  });
  return validEvents;
};
