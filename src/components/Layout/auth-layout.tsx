import loginCover from '@/assets/auth/login-cover.jpg';
import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';

const GRID_SIZE = 56;

const GRID_CELLS = [
  { top: GRID_SIZE, left: GRID_SIZE },
  { top: 0, left: GRID_SIZE * 7 },
  { top: GRID_SIZE * 3, left: GRID_SIZE * 14 },
  { top: GRID_SIZE * 10, left: GRID_SIZE * 2 },
  { bottom: GRID_SIZE * 2, left: GRID_SIZE },
  { bottom: GRID_SIZE, left: GRID_SIZE * 8 },
  { bottom: GRID_SIZE * 4, left: GRID_SIZE * 16 },
  { top: GRID_SIZE * 2, right: GRID_SIZE * 3 },
];

export const AuthLayout = () => {
  return (
    <div className="auth-layout relative min-h-screen overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
              linear-gradient(to right, rgba(15, 23, 42, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 1px, transparent 1px)
            `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      >
        {GRID_CELLS.map((cell, index) => (
          <span
            key={index}
            className="absolute bg-neutral-100 hover:bg-neutral-200"
            style={{ width: GRID_SIZE, height: GRID_SIZE, ...cell }}
          />
        ))}
      </div>

      <Row className="relative z-10 min-h-screen">
        <Col xs={24} lg={12}>
          <div className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="w-full max-w-90">
              <Outlet />
            </div>
          </div>
        </Col>
        <Col xs={0} lg={12} className="p-6">
          <img
            src={loginCover}
            alt=""
            className="h-[calc(100vh-48px)] w-full rounded-[28px] object-cover"
          />
        </Col>
      </Row>
    </div>
  );
};
