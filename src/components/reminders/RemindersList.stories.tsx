import { Meta, StoryFn } from "@storybook/react";
import { RemindersList } from "../reminders/reminders-list";
import { MockedProvider } from "@apollo/client/testing";
import { GET_REMINDERS } from "../../graphql/mutations/reminders";

export default {
  title: "Components/RemindersList",
  component: RemindersList,
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_REMINDERS,
            },
            result: {
              data: {
                authenticatedItem: {
                  __typename: "User",
                  reminders: [
                    {
                      id: "1",
                      label: "Drink Water",
                      time: "08:00 AM",
                      __typename: "Reminder",
                    },
                    {
                      id: "2",
                      label: "Take Vitamins",
                      time: "10:00 AM",
                      __typename: "Reminder",
                    },
                  ],
                },
              },
            },
          },
        ]}
        addTypename={false}
      >
        <Story />
      </MockedProvider>
    ),
  ],
} as Meta<typeof RemindersList>;

const Template: StoryFn<typeof RemindersList> = (args) => <RemindersList {...args} />;

export const Default = Template.bind({});
Default.args = {};

