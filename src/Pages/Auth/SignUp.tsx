import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Banner } from "../../components/Banner";
import { ValidateEmail } from "../../components/SignUp/ValidateEmail";
import { ValidateOTP } from "../../components/SignUp/ValidateOTP";
import { SignUp3 } from "../../components/SignUp/SignUp3";

export const SignUp = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOTP] = useState<string>("");

  const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (userResult) {
  //     if (!isError) {
  //       openNotification("success", userResult.message);
  //     } else {
  //       openNotification("error", userResult.message);
  //     }
  //   }
  // }, [userResult]);

  // React.useEffect(() => {
  //   const object = localStorage.getItem("user");
  //   if (object) {
  //     scroll(0, 0);
  //     navigate(`/`);
  //   }
  // }, []);

  return (
    <>
      <div className="flex md:flex-row flex-col lg:space-x-10 md:space-x-5 space-x-0 lg:mx-20 m-5">
        <div className="lg:w-3/5 md:w-1/2 md:block hidden lg:h-[85vh] rounded drop-shadow-md">
          <Banner></Banner>
        </div>

        <div className="lg:w-2/5 md:w-1/2 w-full lg:h-[85vh] bg-white dark:bg-slate-800 rounded drop-shadow-md">
          <div className="flex flex-col items-center">
            {step === 1 ? (
              <ValidateEmail
                email={email}
                setStep={setStep}
                setEmail={setEmail}
              ></ValidateEmail>
            ) : step === 2 ? (
              <ValidateOTP
                setStep={setStep}
                email={email}
                setOTP={setOTP}
              ></ValidateOTP>
            ) : (
              <SignUp3 email={email} otp={otp}></SignUp3>
            )}
          </div>
        </div>

        <div className="lg:w-3/5 md:w-1/2 md:hidden block sm:h-screen rounded drop-shadow-md mt-5">
          <Banner></Banner>
        </div>
      </div>
    </>
  );
};
