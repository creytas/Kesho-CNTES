import { format, formatDistanceToNow } from "date-fns";
import moment from "moment";
import { preciseDiff } from "moment-precise-range-plugin";

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function fAge(date) {
  var diff = moment.preciseDiff(new Date(date), new Date(), true);
  var year =
    diff.years === 0
      ? ""
      : diff.years === 1
      ? `${diff.years} an`
      : `${diff.years} ans`;
  var month = diff.months === 0 ? "" : `${diff.months} mois`;
  var day =
    diff.days === 0
      ? ""
      : diff.days === 1
      ? `${diff.days} jour`
      : `${diff.days} jours`;

  return year + " " + month + " " + day;
}
