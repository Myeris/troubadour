import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
// app
import {User} from '../../../auth/shared/models/user.model';

export interface UserState extends EntityState<User> {
  isLoggedIn: boolean;
  error: string;
}

export const userEntityAdapter: EntityAdapter<User> = createEntityAdapter<User>({});

export const initialUserState: UserState = userEntityAdapter.getInitialState({
  isLoggedIn: false,
  error: null
});
