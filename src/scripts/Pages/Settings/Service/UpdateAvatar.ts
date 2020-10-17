import { UpdateAvatar } from '../../../API/UpdateAvatar';
import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';
import { showError } from '../../../Framework/FormControl/ShowError';
import { AuthorizationService, User } from '../../../Services/AuthorizationService';

export async function updateAvatarHandler(ev: Event): Promise<boolean> {
  const form = ev.target as HTMLFormElement;
  if (!form) return false;

  try {
    ev.preventDefault();
    ev.stopPropagation();

    const formData = new FormData(form);
    const updateResult = await new UpdateAvatar(formData).perform();

    if (!updateResult.state) {
      const errorsObj = convertErrorFromAPI(updateResult.errors);
      throw { errors: errorsObj };
    }

    const newUser: User | undefined = updateResult.user;
    if (newUser) AuthorizationService.authorize(newUser);

    return true;
  } catch (error) {
    showError(error.errors, form);

    return false;
  }
}
