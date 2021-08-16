import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import { setPublic, setPrivate } from '../commonSlice';

const CustomForFormControl = styled(FormControl)`
  background-color: #f6f5fd;
`;

const CustomRadioGroup = styled(RadioGroup)`
  flex-direction: row;
  justify-content: center;
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  font-size: 1.5rem;
`;

export default function RadioButton() {
  const dispatch = useDispatch();
  const { isPrivate } = useSelector((state) => state.common);
  const currentMode = isPrivate ? 'private' : 'public';
  const handleChange = (event) => {
    return event.target.value === 'public'
      ? dispatch(setPublic())
      : dispatch(setPrivate());
  };

  useEffect(() => {
    dispatch(setPublic());
  }, []);

  return (
    <CustomForFormControl component="fieldset" aria-label="컨테이너">
      <CustomRadioGroup
        aria-label="방 종류"
        name="방 종류"
        onChange={handleChange}
        value={currentMode}
      >
        <CustomFormControlLabel
          value="public"
          control={<Radio size="small" />}
          label="public"
        />
        <CustomFormControlLabel
          value="private"
          control={<Radio size="small" />}
          label="private"
        />
      </CustomRadioGroup>
    </CustomForFormControl>
  );
}
