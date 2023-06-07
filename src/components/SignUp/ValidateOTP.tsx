import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { openNotification } from "../Notifications";
import { api } from "../../api/api";

export const ValidateOTP: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setOptConext: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setStep, email, setOptConext }) => {
  const mutation = useMutation(
    (values: any) => {
      return api.post("auth/validate-otp", values);
    },
    {
      onSuccess: () => {
        setStep(3);
      },
      onError: (err: any) => {
        openNotification("error", err.response.data.message);
      },
    }
  );

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [isOtpValid, setIsOtpValid] = useState<boolean>(false);

  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) return;

    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timeLeft]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      const newOtp = [...otp];
      newOtp[index] = event.target.value;
      setOtp(newOtp);

      if (event.target.value && inputRefs[index + 1]) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && inputRefs[index - 1]) {
      inputRefs[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    setIsOtpValid(otp.every((value) => value !== ""));
    
  }, [otp]);

  const handleResend = () => {
    if (timeLeft === 0) setTimeLeft(10);
  };

  const handleConfirm = () => {
    if (isOtpValid) {
      mutation.mutate({ otp: otp.join(""), email: email });
      setOptConext(otp.join(""))
    } 
  };

  return (
    <>
      <h1 className="font-bold text-center text-2xl sm:my-2 mb-6 pt-16">
        XÁC THỰC EMAIL
      </h1>
      <h1 className="text-center text-base">
        Mã xác thực đã được gửi qua email
      </h1>
      <h1 className="text-center text-base font-medium">
        {email ? email : "testing@gmail.com"}
      </h1>

      <div className="flex justify-center items-center my-8">
        <div className="grid grid-cols-4 gap-5 font-bold text-3xl">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              ref={inputRefs[index]}
              name={index.toString()}
              value={digit}
              maxLength={1}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="w-16 h-16 text-center bg-sky-100 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring focus:ring-sky-600 focus:ring-opacity-50"
            />
          ))}
        </div>
      </div>
      <p>
        Vẫn chưa nhận được OTP?{" "}
        <button
          className={`text-sky-500
        ${timeLeft > 0 ? "cursor-not-allowed opacity-60" : ""}
        `}
          onClick={handleResend}
        >
          Gửi lại {timeLeft > 0 && "(" + timeLeft + "s)"}
        </button>
      </p>
      <button
        className={`lg:w-2/3 md:w-4/5 w-3/4 px-4 py-2 my-4 border border-transparent rounded-md font-semibold
        text-white bg-blue-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out
        ${
          isOtpValid
            ? "hover:bg-blue-600 active:bg-blue-700"
            : "cursor-not-allowed opacity-60"
        }`}
        onClick={handleConfirm}
      >
        XÁC NHẬN
      </button>
      <p>
        Đã có tài khoản?{" "}
        <Link to="/login" className={"text-sky-500"}>
          Đăng nhập ngay
        </Link>
      </p>
    </>
  );
};
