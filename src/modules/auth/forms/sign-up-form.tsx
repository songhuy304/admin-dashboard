import { Button, Form, Input } from 'antd';
import { signUpValidation } from '../validations';

interface SignUpFormValues {
  email: string;
  password: string;
  fullName: string;
}

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => void | Promise<void>;
  initValue?: Partial<SignUpFormValues>;
  isPending?: boolean;
}

const SignUpForm = ({
  onSubmit,
  initValue,
  isPending = false,
}: SignUpFormProps) => {
  const [form] = Form.useForm<SignUpFormValues>();

  return (
    <Form
      form={form}
      name="sign-up"
      initialValues={initValue}
      onFinish={onSubmit}
      layout="vertical"
      size="middle"
      requiredMark={false}
      colon={false}
      className="w-full [&_.ant-form-item-label>label]:w-full"
    >
      <Form.Item
        validateFirst
        name="email"
        label="Email"
        rules={signUpValidation.email}
      >
        <Input placeholder="Email" autoComplete="email" allowClear />
      </Form.Item>

      <Form.Item
        validateFirst
        name="fullName"
        label="Full Name"
        rules={signUpValidation.fullName}
      >
        <Input placeholder="Full Name" autoComplete="full-name" allowClear />
      </Form.Item>

      <Form.Item
        validateFirst
        name="password"
        label="Password"
        rules={signUpValidation.password}
      >
        <Input.Password
          placeholder="Enter your password"
          autoComplete="current-password"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending} block>
        Sign up
      </Button>
    </Form>
  );
};

export { SignUpForm };
