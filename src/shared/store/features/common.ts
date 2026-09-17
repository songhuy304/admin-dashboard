import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BreadcrumbProps } from 'antd';
import { type RootState } from '..';

type BreadcrumbItemType = NonNullable<BreadcrumbProps['items']>[number];

interface CommonState {
  subHeaders: BreadcrumbItemType[];
}

const initialState: CommonState = {
  subHeaders: [],
};

export const commonSlice = createSlice({
  name: 'common',
  reducers: {
    setSubHeaders: (state, action: PayloadAction<BreadcrumbItemType[]>) => {
      state.subHeaders = action.payload as typeof state.subHeaders;
    },
  },
  initialState,
});

export const { setSubHeaders } = commonSlice.actions;
export const selectSubHeaders = (state: RootState) => {
  return state.common.subHeaders;
};

export default commonSlice.reducer;
