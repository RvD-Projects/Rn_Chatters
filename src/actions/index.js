import { incrementByAmount } from "./counters";
import { setError } from "./screenNotification";

export const counterAction = {
    incrementByAmount: incrementByAmount
}

export const screenNotificationAction = {
    setError: setError
}