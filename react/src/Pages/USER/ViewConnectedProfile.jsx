import React from 'react';
import ConnectedProfile from '../../Components/USER/connectedProfile/ConnectedProfile';
import ViewNavbar from './ViewNavbar';
import ViewNavbarMobile from './ViewNavbarMobile';

const ViewConnectedProfile = () => {
  return (
    <div>
      <ViewNavbar />
      <ConnectedProfile />
      <ViewNavbarMobile />
    </div>
  );
};

export default ViewConnectedProfile;
