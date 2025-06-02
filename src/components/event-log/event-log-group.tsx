import {PropsWithChildren} from "react";
import { EventLog } from "./event-log";

export const EventLogGroup=({children}: PropsWithChildren<unknown>) => {
    return <div className="space-y-2">{children}</div>
};

EventLogGroup.Item = EventLog;
