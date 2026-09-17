import { Button, Flex, Form, Input, Typography } from 'antd';

interface LoginFormValues {
  identifier: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  initValue?: Partial<LoginFormValues>;
  loading?: boolean;
}

const LoginForm = ({
  onSubmit,
  initValue,
  loading = false,
}: LoginFormProps) => {
  const [form] = Form.useForm<LoginFormValues>();

  return (
    <Form
      form={form}
      name="login"
      initialValues={initValue}
      onFinish={onSubmit}
      layout="vertical"
      size="middle"
      requiredMark={false}
      colon={false}
      className="w-full [&_.ant-form-item-label>label]:w-full"
    >
      <Form.Item
        name="identifier"
        label="Email"
        rules={[{ required: true, message: 'Please enter your email' }]}
      >
        <Input placeholder="Email" autoComplete="email" allowClear />
      </Form.Item>

      <Form.Item
        name="password"
        label={
          <Flex justify="space-between" align="center" className="w-full">
            <span>Password</span>
            <Typography.Link
              href="#forgot-password"
              className="text-xs font-normal"
            >
              Forgot password?
            </Typography.Link>
          </Flex>
        }
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password
          placeholder="Enter your password"
          autoComplete="current-password"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>
        Sign in
      </Button>
    </Form>
  );
};

export { LoginForm };
