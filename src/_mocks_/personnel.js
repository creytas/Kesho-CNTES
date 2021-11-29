import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const personnel = [...Array(9)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  prenom: faker.name.findName(),
  email: faker.name.findName(),
  status: sample(['Nutritionniste', 'Médecin', 'Infirmier']),
  sex: sample(['F', 'M'])
}));

export default personnel;
