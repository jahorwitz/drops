import { Form } from "../../../components";
// import { useQuery } from "@apollo/client";
// import { GET_ACTIVITIES } from "../../../graphql/queries/activities";
// import { GET_CURRENT_USER } from "../../../graphql/queries/users";

export default function Exercises() {
  // const { data: currentUserData } = useQuery(GET_CURRENT_USER);
  // const userId = currentUserData?.authenticatedItem.id;
  // const { data } = useQuery(GET_ACTIVITIES, {
  //   variables: { userId },
  // });

  //need to specify "activity" type and shape v

  // if (data?.activities) {
  //   data.activities.map((activity: any) => {
  //     console.log(activity);
  //   });
  // }

  return (
    <div className="bg-gray-300 h-screen">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-3 max-w-lg">
        <h4 className="leading-6 font-medium text-xl">Excercises</h4>
        <Form.AddMoreSection buttonText="+ Add exercise">
          <div className="flex justify-between items-center">
            <div>
              <p>Walk</p>
              <p className="text-[rgba(18,18,18,0.6)]">Daily, 9:00 AM</p>
            </div>
            <div className="flex gap-3">
              <button>E</button>
              <button>D</button>
            </div>
          </div>
        </Form.AddMoreSection>
      </div>
    </div>
  );
}
