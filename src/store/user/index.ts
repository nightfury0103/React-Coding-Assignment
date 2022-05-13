import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../../services/user.service";
import { UserState, UserInfo } from "../../type/user";

const initialState: UserState = {
  users: [],
  loading: false,
};

export const getUsersList = createAsyncThunk("user/getUsersList", async () => {
  try {
    const response = await api.getUsersList();

    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUser: (state: UserState, action: PayloadAction<UserInfo>) => {
      state.users = state.users.filter(
        (user: UserInfo) => user.name !== action.payload.name
      );
    },
    updateUser: (
      state: UserState,
      action: PayloadAction<{ values: UserInfo; user: UserInfo }>
    ) => {
      state.users =
        state.users &&
        state.users.map((user) => {
          if (user.name === action.payload.user.name) {
            return (user = action.payload.values);
          } else {
            return user;
          }
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(
        getUsersList.fulfilled,
        (state: UserState, action: PayloadAction<UserInfo[]>) => {
          state.loading = false;
          state.users = action.payload;
          state.users =
            state.users &&
            state.users.map((user: UserInfo) => {
              return (user = {
                ...user,
                backgroundNum: Math.floor(Math.random() * 40) + 60,
              });
            });
        }
      )
      .addCase(getUsersList.rejected, (state: UserState) => {
        state.loading = false;
      });
  },
});

export const { deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
