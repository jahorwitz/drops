import { gql } from "@apollo/client";

const now = new Date();
const oneDay = 24*60*60*1000;

const dayBefore = new Date(now.getTime() - oneDay).toISOString();
const dayAfter = new Date(now.getTime() + oneDay).toISOString();

// export const DIET_LOGS = gql`query DietLogs($where: DietLogWhereInput!, $orderBy: [DietLogOrderByInput!]!) {
//   dietLogs(where: $where, orderBy: $orderBy) {
//     mealName
//     mealDescription
//     protein
//     sugar
//     calories
//     carbs
//     fiber
//   }
// }`;


//upcoming 
//note that upcoming will only log upcoming meals the day after and not any further
export const UPCOMING_DIET_LOGS = gql`
    query UpcomingDietLogs {
        dietLogs(
            where: {
        
                logTime: { 
                 gte: "${now.toISOString()}",
                 lte: "${dayAfter}"
                }
             }
            orderBy: [{logTime: asc}]
         ){
            calories
            carbs
            createdAt
            mealName
            mealDescription
            logTime

         }}`;

//past meals today
export const PAST_DIET_LOGS_TODAY = gql`
    query PastDietLogsToday {
        dietLogs(
            where: {
                
                logTime: { 
                 gte: "${dayBefore}",
                 lte: "${now.toISOString()}"
                }
             }
            orderBy: [{logTime: desc}]
         ){
            calories
            carbs
            createdAt
            mealName
            mealDescription
            logTime

         }}`;

//past meals before today
export const PAST_DIET_LOGS_BEFORE_TODAY = gql`
    query PastDietLogsBeforeToday {
        dietLogs(
            where: {
                
                logTime: { 
                 lte: "${dayBefore}"
                }
             }
            orderBy: [{logTime: desc}]
         ){
            calories
            carbs
            createdAt
            mealName
            mealDescription
            logTime

         }}`;