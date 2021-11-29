import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, ...other }, ref) => (
  <Box ref={ref} {...other} sx={{ zIndex: 9990 }}>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired
};
export default Page;
