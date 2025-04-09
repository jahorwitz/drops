import { PropsWithChildren } from "react";

export const SimpleContainer: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <div className="py-4 flex flex-col bg-lightGray items-center min-h-[100vh]">
      {children}
    </div>
  );
};
