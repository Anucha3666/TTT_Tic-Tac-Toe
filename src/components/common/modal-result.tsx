import React, { FC } from "react";

export type ModalResultType = {
  isOpen: boolean;
};

export const ModalResult: FC<ModalResultType> = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <div
          className={`w-full h-full fixed flex items-center justify-center top-0  z-10   backdrop-blur-sm`}
          onClick={() => {
            console.log("1");
          }}>
          <div
            className={`w-max h-max bg-white rounded-sm shadow-lg p-4 z-20`}
            onClick={() => {
              console.log("2");
            }}>
            <p>You win</p>
          </div>
        </div>
      )}
    </>
  );
};
