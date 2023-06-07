import React from "react";
import {
  PhoneOutlined,
  UserOutlined,
  KeyOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Input, Form, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { ThemeProvider } from "../ThemeProvider";
import { useMutation } from "react-query";

import { openNotification } from "../Notifications";
import { api } from "../../api/api";

export const SignUp3: React.FC<{
  email: string | undefined;
  otp: string | undefined;
}> = ({ email, otp }) => {
  const data = ["Nam", "Nữ"];
  const mutation = useMutation(
    (values) => {
      return api.post("auth/signup", values);
    },
    {
      onSuccess: () => {
        openNotification("sucess", "Đăng ký thành công!");
        
      },
      onError: (err: any) => {
        openNotification("error", err.response.data.message);
      },
    }
  );

  const onFinish = (values: any) => {
    values.otp = otp;
    fetch(import.meta.env.VITE_BACKEND_URL + "auth/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          openNotification("success", "Đăng ký thành công");
          // refetch();
          // return navigate("/");
        } else {
          return openNotification(
            "error",
            "Tên tài khoản hoặc mật khẩu không đùng"
          );
        }
      })
      .catch((err) => {
        return openNotification("error", err.message);
      });
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    return (
      current &&
      (current < dayjs("1950-01-01") || current > dayjs("2010-12-31"))
    );
  };
  return (
    <>
      <h1 className="font-bold text-center text-2xl sm:my-2 mb-6 py-3">
        ĐĂNG KÝ
      </h1>
      <ThemeProvider>
        <Form
          name="basic3"
          initialValues={{ remember: true, email: email }}
          onFinish={onFinish}
          autoComplete="off"
          className="lg:w-2/3 md:w-4/5 w-3/4"
        >
          <Form.Item name="email">
            <Input
              disabled={true}
              size="middle"
              type="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              placeholder="Enter your name"
              size="middle"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input
              size="middle"
              showCount={false}
              type="number"
              placeholder="Enter your phone"
              style={{
                WebkitAppearance: "none",
              }}
              prefix={<PhoneOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <div className="flex justify-between">
            <Form.Item
              name="gender"
              rules={[{ required: true, message: "gender!" }]}
            >
              <Select
                allowClear
                optionLabelProp="label"
                size="middle"
                placeholder={
                  <React.Fragment>
                    <i className="fa-solid fa-mars-and-venus text-black dark:text-white"></i>
                    &nbsp;Gender
                  </React.Fragment>
                }
                className="w-2/5"
              >
                {data.map((data) => (
                  <Select.Option
                    key={data}
                    value={data}
                    label={
                      <React.Fragment>
                        <i className="fa-solid fa-mars-and-venus text-black dark:text-white"></i>
                        &nbsp;
                        {data}
                      </React.Fragment>
                    }
                  >
                    {data}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="dayOfBirth"
              rules={[
                {
                  required: true,
                  message: "dayOfBirth!",
                },
              ]}
            >
              <DatePicker
                size="middle"
                disabledDate={disabledDate}
                defaultPickerValue={dayjs("2000-01-01")}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              size="middle"
              placeholder="Enter your password"
              prefix={<KeyOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Two passwords that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="middle"
              placeholder="Enter your password"
              prefix={<KeyOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          {/* <Form.Item
name="remember"
valuePropName="checked"
className="px-10"
>
<Checkbox>Đồng ý với điều khoản dịch vụ</Checkbox>
</Form.Item> */}

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

      {/* <div className="flex items-center w-2/3">
<div className="w-1/2 h-0.5 bg-gray-500"></div>
<div className="text-center px-2 w-1/4">
<span className="font-middle text-gray-500">HOẶC</span>
</div>
<div className="w-1/2 h-0.5 bg-gray-500"></div>
</div> */}
    </>
  );
};
