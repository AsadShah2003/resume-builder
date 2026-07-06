import { format } from "date-fns";

export const GetDateTime = (): string => {
  return format(new Date(), "HH:mm dd MMM, yyyy");
};
