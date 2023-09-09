import { ThreeDots } from 'react-loader-spinner';
import { StyledLoader } from './Loader.styled';

export const Loader = () => {
  return (
    <StyledLoader>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#303f9f"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </StyledLoader>
  );
};
