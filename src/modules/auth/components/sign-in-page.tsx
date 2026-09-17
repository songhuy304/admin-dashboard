import githubIcon from '@/assets/socical/github.svg';
import googleIcon from '@/assets/socical/google.svg';
import { Logo } from '@/components/ui/logo';
import { APP_NAME } from '@/shared/constants';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { LoginForm } from '../forms/login-form';
import { useSignIn } from '../hooks';
import { AUTH_PATH } from '@/routers';

const { Title, Text, Link } = Typography;

const SignInPage = () => {
  const { onSubmit, isPending } = useSignIn();

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
        <LoginForm onSubmit={onSubmit} loading={isPending} />
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
        <Link
          href={AUTH_PATH.SIGN_UP}
          style={{ fontWeight: 600, color: '#171717' }}
        >
          Sign up
        </Link>
      </Text>
    </Flex>
  );
};

export { SignInPage };
