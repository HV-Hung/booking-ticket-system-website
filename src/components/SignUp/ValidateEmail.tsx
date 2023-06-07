import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Input, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { ThemeProvider } from "../ThemeProvider";
import { useMutation } from "react-query";
import { Modal } from "../Modal/Modal";
import { openNotification } from "../Notifications";
import { message } from "antd";
import { api } from "../../api/api";

export const ValidateEmail: React.FC<{
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ email, setEmail, setStep }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const mutation = useMutation(
    (values: any) => {
      return api.post("auth/validate-email", values);
    },
    {
      onSuccess: () => {
        setStep(2);
      },
      onError: (err: any) => {
        openNotification("error", err.response.data.message);
      },
    }
  );

  const onFinish = (values: any) => {
    setOpenModal(true);
    setEmail(values.email);
  };

  return (
    <>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirm={() => mutation.mutate({ email: email })}
        title="Xác thực email"
        content={`Mã xác thực (OTP) sẽ được gửi qua email ${email}`}
      ></Modal>
      <h1 className="font-bold text-center text-2xl sm:my-2 mb-6 pb-2 pt-20">
        ĐĂNG KÝ
      </h1>
      <ThemeProvider>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          className="lg:w-2/3 md:w-4/5 w-3/4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              size="middle"
              type="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="checkbox"
            valuePropName="checked"
            rules={[
              { required: true, message: "Vui lòng chấp nhận điều khoản!" },
            ]}
          >
            <Checkbox className="font-montserrat">
              Đồng ý với{" "}
              <a href="google.com" className="text-sky-500">
                Điều khoản và dịch vụ
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <button
              className="w-full px-4 py-2 border border-transparent rounded-md font-semibold
              text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
            >
              ĐĂNG KÝ
            </button>
          </Form.Item>
        </Form>
      </ThemeProvider>
      <p>
        Đã có tài khoản?{" "}
        <Link to="/login" className={"text-sky-500"}>
          Đăng nhập ngay
        </Link>
      </p>
    </>
  );
};
