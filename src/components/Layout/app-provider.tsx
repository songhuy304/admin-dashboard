'use client';

import { useGetMe } from '@/modules/users/hooks';
import { AUTH_PATH } from '@/routers';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { selectIsLoading, setUser } from '@/shared/store';
import { tokenStorage } from '@/shared/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLoading } from '../ui/page-loading';

export default function AppBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const globalLoading = useAppSelector(selectIsLoading);

  const [isHydrated, setIsHydrated] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const accessToken = tokenStorage.getAccess();
    setHasToken(!!accessToken);
    setIsHydrated(true);
  }, []);

  const { data, error, isLoading } = useGetMe({
    enabled: isHydrated && hasToken,
  });

  useEffect(() => {
    if (!isHydrated) return;

    if (!hasToken || error) {
      navigate(
        `${AUTH_PATH.SIGN_IN}?redirect=${encodeURIComponent(window.location.pathname)}`,
        { replace: true },
      );
    }
  }, [isHydrated, hasToken, error, navigate]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  const isAuthorized = isHydrated && hasToken && !!data && !error;

  if (!isHydrated || isLoading || !isAuthorized) {
    return <PageLoading />;
  }

  return (
    <>
      {globalLoading && <PageLoading />}
      {children}
    </>
  );
}
