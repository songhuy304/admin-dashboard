import githubIcon from '@/assets/socical/github.svg';
import googleIcon from '@/assets/socical/google.svg';
import { Logo } from '@/components/ui/logo';
import { Button, Col, Divider, Flex, Row, Typography, message } from 'antd';
import { useState } from 'react';
import LoginForm from './components/login-form';
import { APP_NAME } from '@/shared/constants';

const { Title, Text, Link } = Typography;

const SignInPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      console.log('Login values:', values);
      message.success('Login successful!');
    } catch (_error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex vertical className="w-full">
      <Flex vertical align="center">
        <Logo withText={false} isLink={false} width={32} height={30} />
        <Title level={3} style={{ marginTop: 16, marginBottom: 4 }}>
          Sign in to {APP_NAME}
        </Title>
        <Text type="secondary">Welcome back.</Text>
      </Flex>

      <div className="mt-8 w-full">
        <LoginForm
          onSubmit={handleSubmit}
          initValue={{
            username: '',
            password: '',
          }}
          loading={loading}
        />
      </div>

      <Divider>
        <Typography.Text type="secondary">Or continue with</Typography.Text>
      </Divider>

      <Row gutter={12}>
        <Col span={12}>
          <Button
            block
            shape="round"
            icon={<img src={googleIcon} alt="" width={16} height={16} />}
          >
            Google
          </Button>
        </Col>
        <Col span={12}>
          <Button
            block
            shape="round"
            icon={<img src={githubIcon} alt="" width={16} height={16} />}
          >
            GitHub
          </Button>
        </Col>
      </Row>

      <Text type="secondary" className="mt-6 text-center">
        Need an account?{' '}
        <Link href="/sign-up" style={{ fontWeight: 600, color: '#171717' }}>
          Sign up
        </Link>
      </Text>
    </Flex>
  );
};

export { SignInPage };
