import {FormControl} from "@angular/forms"
export function validateTime(time : FormControl){
  const t = (new Date(time.value));
  if (t.getTime() < Date.now()) {
    return {
      validateTime: {
        error: "You must pick a future time."
      }
    }
  }else{
    if (t.getHours() < 11 || t.getHours() > 22){
      return {
        validateTime: {
          error: "Sorry, we only server from 11:00 AM to 11:00 PM."
        }
      }
    }
  }
  return null;
}
