export const phoneNumberValidation = (inputTxt: String) =>
{
  var phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputTxt.valueOf().match(phoneNo))
        {
      return true;
        }
      else
        {
        return false;
        }
}