import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// app
import { User } from '../../auth/shared/models/user.model';

export interface UserState extends EntityState<User> {
  selectedId: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string;
  verificationEmailSent: boolean;
}

export const userEntityAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
});

export const initialUserState: UserState = userEntityAdapter.getInitialState({
  selectedId: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  verificationEmailSent: false
});
