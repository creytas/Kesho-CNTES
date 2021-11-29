/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* no-nested-ternary */
import './PatientCard.css';
import { CalendarToday, PhoneAndroid } from '@material-ui/icons';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { TableCell } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Badge from '@material-ui/core/Badge';
import moment from 'moment';
import Label from '../Label';

const PatientCard = ({
  name,
  sex,
  age,
  birthdate,
  number,
  tutor,
  location,
  id,
  malnutrition,
  transfer
}) => (
  <div className="userShow">
    <div className="userShowTop">
      {/* <Avatar alt={name} src={`/static/mock-images/avatars/avatar_${id}.jpg`} /> */}
      <div className="userShowTopTitle">
        <h2>
          <span className="userShowUsername">{name}</span>
        </h2>
        <span className="userShowUserTitle">{sex}</span>
      </div>
    </div>
    <div className="userShowBottom">
      <div className="userShowInfo">
        <ChildCareIcon className="userShowIcon" />
        <span className="userShowInfoTitle">{age}</span>
      </div>
      <div className="userShowInfo">
        <CalendarToday className="userShowIcon" />
        <span className="userShowInfoTitle">{moment(birthdate).format('DD/MM/YYYY')}</span>
      </div>
      <div className="userShowInfo">
        <PhoneAndroid className="userShowIcon" />
        <span className="userShowInfoTitle">{number}</span>
      </div>
      <div className="userShowInfo">
        <EmojiPeopleIcon className="userShowIcon" />
        <span className="userShowInfoTitle">{tutor}</span>
      </div>
      <div className="userShowInfo">
        <LocationOnIcon className="userShowIcon" />
        <span className="userShowInfoTitle">{location}</span>
      </div>
      <div className="userShowInfo">
        <LocalHospitalIcon className="userShowIcon" />

        <TableCell align="left">
          {transfer ? (
            <>
              <Badge color="error" variant="dot" />
              &nbsp;{' '}
            </>
          ) : (
            ''
          )}

          <Label
            variant="contained"
            sx={{
              color: `${
                malnutrition === 'MAC'
                  ? '#D32F2F'
                  : malnutrition === 'MAM'
                  ? '#ffb74d'
                  : malnutrition === 'MAS-K'
                  ? '#e57373'
                  : malnutrition === 'MAS-M'
                  ? '#f57c00'
                  : '#4CAF50'
              }`
            }}
          >
            {malnutrition}
          </Label>
        </TableCell>
        {/* <span className="userShowInfoTitle">{malnutrition}</span> */}
      </div>
    </div>
  </div>
);

export default PatientCard;
