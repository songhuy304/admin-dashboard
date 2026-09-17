import githubIcon from '@/assets/socical/github.svg';
import googleIcon from '@/assets/socical/google.svg';
import { Logo } from '@/components/ui/logo';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { APP_NAME } from '@/shared/constants';
import { SignUpForm } from '../forms/sign-up-form';
import { AUTH_PATH } from '@/routers';
import { useSignup } from '../hooks';

const { Title, Text, Link } = Typography;

const SignUpPage = () => {
  const { onSubmit, isPending } = useSignup();

  return (
    <Flex vertical className="w-full">
      <Flex vertical align="center">
        <Logo withText={false} isLink={false} width={32} height={30} />
        <Title level={3} style={{ marginTop: 16, marginBottom: 4 }}>
          Sign up to {APP_NAME}
        </Title>
      </Flex>

      <div className="mt-8 w-full">
        <SignUpForm onSubmit={onSubmit} isPending={isPending} />
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
        Already have an account?{' '}
        <Link
          href={AUTH_PATH.SIGN_IN}
          style={{ fontWeight: 600, color: '#171717' }}
        >
          Sign in
        </Link>
      </Text>
    </Flex>
  );
};

export { SignUpPage };
