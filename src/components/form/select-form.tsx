import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import cx from "classnames";
import { HTMLProps, forwardRef, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    placeholder?: string;
    hintText?: string;
    options: Option[];
    feedback?: FieldErrors<T>;
  };

export const SelectForm = forwardRef<HTMLInputElement, Props<FieldValues>>(
  (
    {
      name,
      labelText,
      placeholder,
      hintText,
      options,
      feedback,
      value,
      onChange,
      className,
    }: Props<FieldValues>,
    ref
  ) => {
    const initialSelected = options.find((option) => option.value === value);
    const [selected, setSelected] = useState<Option | undefined>(
      initialSelected
    );
    return (
      <div
        className={cx(
          "flex flex-col gap-1 leading-5 text-base font-normal font-text",
          className
        )}
      >
        <label
          htmlFor={name}
          className="text-base leading-[19px] font-text mb-1"
        >
          {labelText}
        </label>
        <Listbox
          ref={ref}
          value={selected}
          onChange={(o) => {
            setSelected(o);
            onChange && onChange({ target: { name, value: o.value } });
          }}
        >
          <div className="relative">
            <ListboxButton
              className={cx(
                "w-full relative border-2 rounded-lg py-5 px-3 bg-white focus:outline-none focus:border-blue-500 flex",
                selected ? "border-black" : "border-gray-300"
              )}
            >
              <span
                className={cx("block truncate", !selected && "text-black/60")}
              >
                {selected?.label || placeholder || "Choose"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue" : "text-gray-900"
                    }`
                  }
                >
                  {({ active }) => (
                    <div
                      className={`${
                        active ? "text-white" : "text-gray-900"
                      } cursor-default select-none relative py-2 pl-3 pr-9`}
                    >
                      <span
                        className={`${
                          active ? "font-semibold" : "font-normal"
                        } block truncate`}
                      >
                        {option.label}
                      </span>
                      {active ? (
                        <span
                          className={` absolute inset-y-0 right-0 flex items-center pr-4`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
        {feedback ? (
          <span className="text-red text-base leading-5">
            {feedback[name]?.message as string}
          </span>
        ) : hintText ? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  }
);

SelectForm.displayName = "SelectForm";
