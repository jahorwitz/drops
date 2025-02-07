// import { useQuery } from "@apollo/client";
// import { GET_ACTIVITIES } from "../../../graphql/queries/activities";
// import { GET_CURRENT_USER } from "../../../graphql/queries/users";

export default function Exercises() {
  // const { data: currentUserData } = useQuery(GET_CURRENT_USER);
  // const userId = currentUserData?.authenticatedItem.id;
  // const { data } = useQuery(GET_ACTIVITIES, {
  //   variables: { userId },
  // });

  // if (data?.activities) {
  //   data.activities.map((activity: any) => {
  //     console.log(activity);
  //   });
  // }

  return (
    <div className="bg-gray-300 h-screen">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-3 max-w-lg">
        <h4 className="leading-6 font-medium text-xl">Excercises</h4>

        {/* {data?.activities &&
          data.activities.map((activity: any) => {
            return (
              <div key={activity.id}>
                <p>{activity.name}</p>
                <p className="text-[rgba(18,18,18,0.6)]">
                  {activity.daysOfWeek.map((dayOfWeek: any) => {
                    return `${dayOfWeek} `;
                  })}
                  {"/ "}
                  {new Date(activity.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            );
          })} */}
      </div>
    </div>
  );
}
