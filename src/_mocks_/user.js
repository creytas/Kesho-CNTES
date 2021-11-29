import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(24),
  name: faker.name.findName(),
  consulete: faker.name.findName(),
  dataNaissance: '20/12/2020',
  derniereDataCons: '20/12/200',
  typeMalnutri: sample(['Aigu modéré', 'Aigui sévère', 'légère']),
  sex: sample(['F', 'M'])
}));

export default users;
