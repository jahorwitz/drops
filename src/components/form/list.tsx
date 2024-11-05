import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../button";
import { Form } from "./form";
import { TimePicker } from "./time-picker";
import { v4 as uuidv4 } from "uuid";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

type Props = {
  component: typeof TimePicker;
  componentProps: {
    validation: object;
  };
  //add more component types here as needed
};

export const List = ({
  component: Component,
  componentProps: ComponentProps,
}: Props) => {
  const [items, setItems] = useState<string[]>([uuidv4()]);

  const {
    control,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { [key: string]: string }) => {
    alert(JSON.stringify(Object.values(data), null, 2));
  };

  const addItem = (id: string) => {
    setItems((prevState) => [...prevState, id]);
  };

  const removeItem = (reminder: { [key: number]: string }) => {
    setItems((prevState) => {
      return prevState.filter((item) => item != reminder);
    });
  };

  return (
    <div className="flex flex-col bg-[#FFCCD4] max-w-screen-md pb-8 px-[10px] relative overflow-hidden m-auto h-screen">
      <div className="bg-white mx-auto min-w-[315px] max-w-[400px] px-4 py-3 w-full rounded-[16px]">
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {items.map((item) => {
            const itemIndex = items.indexOf(item) + 1;

            return (
              <div key={item}>
                <p className="text-base leading-[19px] font-text mb-1">
                  {`Reminder ${itemIndex}`}{" "}
                </p>
                <div className="flex items-center">
                  <Controller
                    name={item}
                    control={control}
                    render={({ field }) => {
                      return (
                        <>
                          <Component
                            {...field}
                            {...register(item, ComponentProps.validation)}
                            setValue={(name, value) =>
                              field.onChange({ target: { name, value } })
                            }
                            feedback={errors[item]?.message as string}
                          />
                          <Button
                            type="button"
                            variant="icon"
                            buttonText=""
                            className="ml-auto"
                            icon={faTrashCan}
                            onClick={() => {
                              removeItem(item);
                              unregister(item);
                            }}
                          ></Button>
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
          <Button
            type="button"
            variant="text"
            buttonText="+ Add more"
            className="my-5 p-0"
            onClick={() => addItem(uuidv4())}
          ></Button>
          <Button type="submit" variant="primary" buttonText="Submit"></Button>
        </Form>
      </div>
    </div>
  );
};
