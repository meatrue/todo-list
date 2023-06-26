import styled from '@emotion/styled';
import Button from '@mui/material/Button';

export const AddButton = styled(Button)`
  align-items: center;
  width: 100%;
  min-width: 150px;
  height: 100%;
  line-height: 1;
  color: white;
  background: #00a884;
  border: 2px solid #008069;
  box-shadow: none;

  &:hover {
    background: #008069;
    box-shadow: none;
  }

  &:disabled {
    border-color: rgba(0, 0, 0, 0.12);
  }

  svg {
    display: block;
    width: 30px;
    height: 30px;
  }
`;